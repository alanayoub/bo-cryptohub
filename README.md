## Current

### Setup
```
source ~/.profile
nvm use
```

### There are 3 applications
```
node --harmony_async_iteration --use-strict ./src/app-scrape.js
node --harmony_async_iteration --use-strict ./src/app-analytics.js
node --harmony_async_iteration --use-strict ./src/app-stream.js
```

## New

Create one application that does all of the above. Can use separate applications if that makes sense but there should be one interface.

### Example interface
```javascript
{
  scrape: {
    cryptocompare: {
      cacheFor: settings.cacheForCryptocompare,
      rateLimitDelayMs: settings.queueCryptocompare,
      bootstrap: {
        name: 'coinList',
        async func() {
          return await scrapeJSON(settings.uriCryptocompareList, settings.keyCryptocompareList, cacheFor)
        }
      },
      items: [
        {
          name: 'coinList',
          interval: 1000 * 5,
          getJobs: getJobs(queue) => {
            // queue.push({uri, key, cacheFor}); // CURRENT
            return []                            // NEW, return jobs then add them to queue
          },
          save: save() => {} // save handler
        },
        {name: 'price',         interval: 1000 * 5, ...},
        {name: 'exchangePairs', interval: 1000 * 5, ...},
        {name: 'socialStats',   interval: 1000 * 5, ...},
        {name: 'snapshot',      interval: 1000 * 5, ...},
        {name: 'other',         interval: 1000 * 5, ...},
      ]
    },
    coinmarketcap: {
      cacheForDays: settings.cacheForCoinmarketcap,
      rateLimitDelay: settings.queueCoinmarketcap,
      items: [
        {
          name: 'ticker',
          interval: 1000,
          getJobs() {},
          save() {}
        }
      ]
    },
    xe: {
      cacheForDays: settings.cacheForXe,
      rateLimitDelay: settings.queueForXe,
      items: [
        {
          name: 'currency',
          interval: 1000,
          getJobs() {},
          save() {}
        }
      ]
    }
  }
}
```
