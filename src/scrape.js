"use strict"

// Node
const fs = require('fs');
const glob = require('glob');
const crypto = require('crypto');
const { promisify } = require('util');
const EventEmitter = require('events');

// Libs
const rp = require('request-promise');
const cheerio = require('cheerio');

// CryptoHub
const { getCurrentDate, typeOfData, logHeader } = require('./utils.js');
const { Project } = require('./db-schema');

// Local
const readFileAsync = promisify(fs.readFile);

/**
 *
 * Class Scrape
 *
 * @param {Number} scrapeRate
 * @param {Number} requestLimit
 * @param {Number} requestDelay
 *
 */
module.exports = class Scrape extends EventEmitter {

    constructor({scrapeRate = 1, requestLimit = Infinity, requestDelay = 2000}) {
      super();
      console.log(logHeader('Scraping CoinMarketCap.com'));
      this.start({scrapeRate, requestLimit, requestDelay});
    }

    static get coinsDataUrl() {
      return 'https://s2.coinmarketcap.com/generated/search/quick_search.json';
    }

    static getCoinsDataFilePath(date) {
      return `data/coinData/${date}.json`;
    }

    static coinDataUrl(slug) {
      return `https://coinmarketcap.com/currencies/${slug}/`;
    }

    /**
     *
     * Get coin data
     *
     * If data not already saved fetch from source and save
     * TODO: retry if error
     *
     * @param {boolean} overwrite - fetch even if file already exists
     *
     */
    static async getCoinData(overwrite = false) {

      //
      // TODO: move this day check to work for the whole start function, or maybe
      // two separate limits and put them as options for the class
      //
      const currentDate = getCurrentDate();
      const path = this.getCoinsDataFilePath(currentDate);

      // Get cached file
      if (!overwrite && fs.existsSync(path)) {
        console.log('File exists');
        try {
          const coinData = await readFileAsync(path, {encoding: 'utf8'});


          return JSON.parse(coinData);
        }
        catch (error) {
          return console.log(`Error fetching file: ${error}`);
        }
      }
      // Fetch file from source
      else {
        console.log('File doesn\'t exist or overwrite');
        const options = {
          uri: this.coinsDataUrl,
          json: true,
        };
        const coinData = await rp(options);
        fs.writeFile(path, JSON.stringify(coinData), function writeCoinDataFile(error) {
          if (error) {
            return console.log(error);
          }
          console.log('File saved');
        });
        return coinData;
      }

    }

    /**
     *
     * Get a list of all github URLs from coinbarketcaps coin details page
     *
     */
    static async getGithubUrls(slug) {
      const uri = this.coinDataUrl(slug);
      const options = {
        uri,
        transform: body => {
          return cheerio.load(body);
        }
      };
      const urls = [];
      return await rp(options)
        .then($ => {
          const githubs = $('a[href^="https://github"]').toArray();
          githubs.forEach(a => {
            urls.push(a.attribs.href);
          });
          console.log(`Scraped the following urls from ${uri}:\n${urls}`);
          return urls;
        })
        .catch(error => {
          console.log(`Error fetching getGithubUrls: ${error}`);
        });
    }

    /**
     *
     * Save basic coin data scraped from coinMarketCap to the Projects collection
     *
     */
    static async saveCoreCoinData(coinData) {

      const len = coinData.length;
      const errors = [];
      let count = 0;

      return await new Promise(resolve => {

        coinData.forEach((data, idx) => {

          const query = {
            _id: data.slug,
          };

          const update = {
            name: data.name,
            _id: data.slug,
            rank: data.rank,
            date: new Date(),
            symbol: data.symbol,
          };

          const options = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
          };

          Project.findOneAndUpdate(query, update, options, (error, result) => {
            count++;
            if (error) {
              errors.push(error);
              console.log(`saveCoinData() error saving document ${data.slug}: ${error}`);
            }
            else {
              console.log(`saveCoinData() saved a document: ${data.slug}`);
            }
            if (count === len) {
              console.log(`saveCoinData() finished saving core coin data with ${errors.length} errors`);
              resolve();
            }
          });

        });

      });


    }

    /**
     *
     * @param {String} project
     * @param {Array} urls
     *
     */
    static async saveGithubUrls({_id, urls}) {

      return await new Promise(resolve => {

        if (!Array.isArray(urls)) {
          console.log(`saveGithubUrls takes an Array as it's second paramater, you provided: ${typeOfData(urls)}`);
          resolve();
          return;
        }

        Project.findById(_id, (error, project) => {

          if (error) {
            console.log(`Error saving githubUrls field to project ${_id}: ${error}`);
            resolve();
            return;
          }

          project.githubUrls = urls;

          project.save((error, updated) => {
            if (error) {
              console.log(`Error saving githubUrls field for project ${_id}: ${error}`);
            }
            else {
              console.log(`Updated project ${_id} githubUrls field to: ${updated.githubUrls}`);
            }
            resolve();
          });

        });

      });

    }

    /**
     *
     *
     * @param {Number} scrapeRate - How often to scrape in days
     * @param {Number} requestLimit - For test purposes limit the number of requests
     * @param {Number} requestDelay - How long to wait inbetween requests so coinmarketcap doesn't crap out (in ms)
     *
     * TODO: emit a done event
     *
     */
    async start({scrapeRate, requestLimit, requestDelay}) {

      const scrape = this;
      const coinData = await Scrape.getCoinData();
      let slugs = coinData.map(v => v.slug);
      let results = {};

      await Scrape.saveCoreCoinData(coinData);

      (async function scrapeGitUrlsForAllProjects(idx = 0) {
        const slug = slugs.shift();
        results[slug] = await Scrape.getGithubUrls(slug);
        await Scrape.saveGithubUrls({_id: slug, urls: results[slug]});
        idx++;
        if (slugs.length && idx < requestLimit) {
          setTimeout(() => {
            console.log('\nWaiting 2000ms and incrementing counter now lets do next scrape...');
            scrapeGitUrlsForAllProjects(idx);
          }, 2000);
        }
        else {
          console.log(`results:\n${JSON.stringify(results)}`);
          scrape.emit('done');
        }
      })();

    }

}
