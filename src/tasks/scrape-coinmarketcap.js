// Node
const fs = require('fs');
const glob = require('glob');
const crypto = require('crypto');
const EventEmitter = require('events');

// Libs
const rp = require('request-promise');
const { to } = require('await-to-js');
const cheerio = require('cheerio');

// CryptoHub
const settings = require.main.require('./settings');
const { Project } = require.main.require('./db-schema');
const { getCurrentDate, typeOfData, logHeader } = require.main.require('./utils.js');

/**
 *
 * Get a list of all github URLs from coinbarketcaps coin details page
 *
 */
async function getGithubUrls(slug) {

  const uri = `https://coinmarketcap.com/currencies/${slug}/`;
  const key = `/coinmarketcap/details/${slug}.html`;
  const urls = [];

  const options = {
    uri,
    transform: html => cheerio.load(html)
  };

  let $;
  let error;
  let [file, age] = global.cache.get(key);
  if (true || !file || age > settings.cacheForCoinmarketcapProjectHtml) {
    [error, $] = await to(rp(options));
    if (!$) {
      return console.log(`getGithubUrls(): Error fetching getGithubUrls: ${error}`);
    }
    file = $.html();
    global.cache.set(key, file);
  }
  else {
    $ = cheerio.load(file);
  }
  const githubs = $('a[href^="https://github"]').toArray();

  if (global.githubOverrides[slug]) {
    if (!githubs.length) {
      console.log('NOTE: Found a github url that didn\'t exist before');
    }
    githubs.push(global.githubOverrides[slug]);
  }

  githubs.forEach(a => {
    urls.push(a.attribs.href);
  });
  console.log(`getGithubUrls(): Scraped the following urls from ${uri}: ${urls}`);
  return urls;
}

/**
 *
 * Save basic coin data scraped from coinMarketCap to the Projects collection
 *
 */
async function saveCoreCoinData(coinData) {

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
          resolve(errors, !errors.length);
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
async function saveGithubUrls({_id, urls}) {

  return await new Promise(resolve => {

    if (!Array.isArray(urls)) {
      console.log(`saveGithubUrls(): takes an Array as it's second paramater, you provided: ${typeOfData(urls)}`);
      resolve();
      return;
    }

    Project.findById(_id, (error, project) => {
      if (error) {
        console.log(`saveGithubUrls(): Error saving githubUrls field to project ${_id}: ${error}`);
        resolve();
        return;
      }
      project.githubUrls = urls;
      project.save((error, updated) => {
        if (error) {
          console.log(`saveGithubUrls(): Error saving githubUrls field for project ${_id}: ${error}`);
        }
        else {
          console.log(`saveGithubUrls(): Updated project ${_id} githubUrls field to: ${updated.githubUrls}`);
        }
        resolve();
      });
    });

  });

}

/**
 *
 * @param {Number} requestLimit - For test purposes limit the number of requests to coinmarketcap project pages
 * @param {Number} requestDelay - How long to wait inbetween requests so coinmarketcap doesn't crap out (in ms)
 *
 */
module.exports = async function scrapeCoinmarketcap({requestLimit = Infinity, requestDelay = 2000}) {

  // TODO: remove this new Promise shit, its an async function dumbass
  return new Promise(async resolve => {

    try {

      console.log(logHeader('Scraping CoinMarketCap.com'));
      const uri = 'https://s2.coinmarketcap.com/generated/search/quick_search.json';
      const key = '/coinmarketcap/search/coins.json';

      let error;
      let [file, age] = settings.cache.get(key);
      if (!file || age > settings.cacheForCoinmarketcapProjectsJson) {
        // TODO: replace with get?
        [error, file] = await to(rp({uri, json: true}));
        if (!file) return console.log(`scrape(): ${error}`);
        global.cache.set(key, JSON.stringify(file));
        const [saveError] = await to(saveCoreCoinData(file));
        if (saveError) return console.log(`scrape(): error saving: ${saveError}`);
      }
      else {
        file = JSON.parse(file);
      }

      let slugs = file.map(v => v.slug);
      let results = {};
      //
      // TODO: skip cached stuff
      //
      (async function scrapeAndSaveGitUrlsForAllProjects(idx = 0) {
        const slug = slugs.shift();

        // TODO: Do error checking here
        results[slug] = await getGithubUrls(slug);
        await saveGithubUrls({_id: slug, urls: results[slug]});

        idx++;
        if (slugs.length && idx < requestLimit) {
          setTimeout(() => {
            console.log(`Scrape(): Waiting ${requestDelay}ms and incrementing counter now lets do next scrape...`);
            scrapeAndSaveGitUrlsForAllProjects(idx);
          }, 1);
        }
        else {
          resolve(results);
        }
      })();

    }
    catch(error) {
      console.log(`scrapeCoinmarketcap(): ${error}`);
      return {error: true, message: `scrapeCoinmarketcap(): ${error}`};
    }

  });

}
