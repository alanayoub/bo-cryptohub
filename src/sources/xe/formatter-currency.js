'use strict';

import { perSecondSave } from '../../db';

// Libs
const cheerio = require('cheerio');

// CryptoHub
const logger = require('../../logger');
const settings = require('../../settings');

/**
 *
 * XE
 *
 * USD Currency Table
 * @return {Object}
 *
 * Currency conversion data for USD
 *
 *  USD: {name: "US Dollar", unitsPerUSD: "1.0000000000", USDPerUnits: "1.0000000000"},
 *  EUR: {name: "Euro",      unitsPerUSD: "0.8576784390", USDPerUnits: "1.1659381355"}
 *
 */
export default async function formatterCurrency(response, timestamp) {
  try {

    const data = {};
    const $ = cheerio.load(response);
    const trs = $('#historicalRateTbl tbody tr').toArray();
    for (const tr of trs) {
      const tds = $(tr).find('td').toArray();
      const code = $(tds[0]).text();
      const name = $(tds[1]).text();
      const unitsPerUSD = $(tds[2]).text();
      const USDPerUnits = $(tds[3]).text();
      data[code] = {
        'xe-name': name,
        'xe-unitsPerUSD': unitsPerUSD,
        'xe-USDPerUnits': USDPerUnits,
      }
    }

    await perSecondSave(data, timestamp);
    return {data, timestamp};

  }
  catch(error) {
    const message = `formatterCurrency(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
