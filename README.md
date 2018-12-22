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
```
{
  scrape: {
    cryptocompare: {
      cacheForDays: settings.cacheForCryptocompare,
      rateLimitDelayMs: settings.queueCryptocompare,
      scrape: [
        'coinList',
        'price',
        'exchangePairs',
        'socialStats',
        'snapshot',
        'other'
      ]
    },
    coinmarketcap: {
      cacheForDays: settings.cacheForCoinmarketcap,
      rateLimitDelayMs: settings.queueCoinmarketcap,
    },
    coinmarketcap: {
      cacheForDays: settings.cacheForXe,
      rateLimitDelayMs: settings.queueForXe,
    }
  }
}
```
