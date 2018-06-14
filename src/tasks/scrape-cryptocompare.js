// Libs
const rp = require('request-promise');
const { to } = require('await-to-js');

// CryptoHub
const Cache = require('../cache');
const { getCurrentDate, typeOfData, logHeader } = require('../utils.js');
const { Project } = require('../db-schema');

async function getJSON(uri, key, prop) {
  let error;
  let [file, age] = global.cache.get(key);
  if (!file || age > global.cacheForCryptoCompare) {
    [error, file] = await to(rp({uri, json: true}));
    if (!file) return console.log(`get(): ${error}`);
    global.cache.set(key, JSON.stringify(file[prop]));
    file = file[prop];
  }
  else {
    file = JSON.parse(file);
  }
  return file;
}

/**
 *
 */
async function apiGetSocial(ids) {

  const data = {};
  const socialstats = {};
  for (const id of ids) {
    const uri = `https://www.cryptocompare.com/api/data/socialstats/?id=${id}`;
    const key = `/cryptocompare/socialstats/${id}.json`;
    socialstats[id] = await getJSON(uri, key, 'Data');
  }

  for (let [key, val] of Object.entries(socialstats)) {
    data[key] = {
      '_id':                       val.General.Name,
      'Code Repository Points':    val.CodeRepository.Points,
      'General Points':            val.General.Points,
      'Reddit Points':             val.Reddit.Points,
      'Reddit Active Users':       val.Reddit.active_users,
      'Reddit Comments Per Day':   val.Reddit.comments_per_day,
      'Reddit Community Creation': val.Reddit.community_creation,
      'Reddit Posts Per Day':      val.Reddit.posts_per_day,
      'Reddit Subscribers':        val.Reddit.subscribers,
      'Twitter Points':            val.Twitter.Points,
      'Twitter Account Creation':  val.Twitter.account_creation,
      'Twitter Followers':         val.Twitter.followers,
      'Twitter Statuses':          val.Twitter.statuses,
      'Cryptocompare Points':      val.CryptoCompare.Points,
      'Cryptocompare Posts':       val.CryptoCompare.Posts,
      'Cryptocompare Page Views':  val.CryptoCompare.PageViews,
      'Cryptocompare Followers':   val.CryptoCompare.Followers,
      'Cryptocompare Comments':    val.CryptoCompare.Comments
    }
  }

  const txt = jsonToTabDelimeted(data);

  return {
    data, txt
  };

}

/**
 *
 */
async function apiGetSnapshot(ids) {

  const data = {};
  const snapshot = {};

  for (const id of ids) {
    const uri = `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${id}`;
    const key = `/cryptocompare/snapshot/${id}.json`;
    snapshot[id] = await getJSON(uri, key, 'Data');
  }

  for (let [key, val] of Object.entries(snapshot)) {
    data[key] = {
      '_id':               val.General.Symbol,
      'Algorithm':         val.General.Algorithm,
      'Proof':             val.General.ProofType,
      'Start Date':        val.General.StartDate,
      'Hashes Per Second': val.General.NetHashesPerSecond,
      'ICO':               val.ICO ? val.ICO.Status : 'False',
      // 'Subs':              val.General.subs, // Exchange pairs
    }
  }


  const txt = jsonToTabDelimeted(data);

  return {
    data, txt
  };

}

/**
 *
 */
function jsonToTabDelimeted(json) {

  let txt = '';
  for (let [key, val] of Object.entries(json)) {

    // column names
    if (txt === '') {
      for (let prop of Object.keys(val)) {
        txt += `${prop}\t`;
      }
    }

    txt += '\n';

    // rows
    for (let value of Object.values(val)) {
      txt += `${value}\t`;
    }
  }
  return txt;

}

/**
 *
 */
module.exports = async function scrapeCryptocompare() {

  console.log(logHeader('Scraping cryptocompare.com'));
  const uri = 'https://min-api.cryptocompare.com/data/all/coinlist';
  const key = '/cryptocompare/coinlist/coinlist.json';

  let error;
  let [file, age] = global.cache.get(key);
  if (!file || age > global.cacheForCryptoCompare) {
    [error, file] = await to(rp({uri, json: true}));
    if (!file) return console.log(`scrape(): ${error}`);
    global.cache.set(key, JSON.stringify(file.Data));
    file = file.Data;
  }
  else {
    file = JSON.parse(file);
  }

  let ids = Object.values(file).map(v => v.Id);
  const social = await apiGetSocial(ids);
  const snapshot = await apiGetSnapshot(ids);
  global.cache.set('test/social.txt', social.txt);
  global.cache.set('test/snapshot.txt', snapshot.txt);

  return {
    social, snapshot
  };

}
