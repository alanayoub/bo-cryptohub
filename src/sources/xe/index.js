import formatterCurrency from './formatter-currency.js';
import settings          from '../../settings';

const config = {
  cacheFor: settings.cacheForXe,
  bootstrap: () => {return {}},
  rateLimitDelayMs: settings.rateLimitXe
};

let currency;
{
  const uri = (str, id) => `https://xe.com/currencytables/?from=${id}`;
  const key = (str, id) => `${settings.scrapeDir}/xe-currencytables/${id}.html`;
  currency = {
    event: 'store',
    name: 'currency',
    interval: 1000 * 60 * 60 * 24,
    watchDirs: [key`${'USD'}`, 'all'],
    getJobs(queue) {
      queue.push({
        uri: uri`${'USD'}`,
        key: key`${'USD'}`,
        cacheForDays: 0
      });
    },
    formatter: formatterCurrency
  };
};

export default {
  config,
  currency
}
