'use strict';

import settings          from '../../settings';

import formatterCurrency from './formatter-currency.js';

const config = {
  cacheFor: settings.cacheForXe,
  bootstrap: () => {return {}},
  rateLimitDelayMs: settings.rateLimitXe,
};

//
// CURRENCY
//
const currency = {
  event: 'data',
  name: 'currency',
  interval: 1000 * 60 * 60 * 24,
  watchDirs: [settings.tagKeyXeCurrencyTables`${'USD'}`, 'all'],
  getJobs(queue, bootstrapData) {
    queue.push({
      uri: settings.tagUriXeCurrencyTables`${'USD'}`,
      key: settings.tagKeyXeCurrencyTables`${'USD'}`,
      cacheForDays: 0
    });
  },
  formatter: formatterCurrency
};

export default {
  config,
  currency,
}
