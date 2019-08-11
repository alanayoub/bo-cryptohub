//
//
// ██████╗ ██╗███╗   ██╗ █████╗ ██████╗ ██╗   ██╗ ██████╗ ██╗   ██╗███████╗██████╗ ██████╗  ██████╗ ███████╗███████╗
// ██╔══██╗██║████╗  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝██╔═══██╗██║   ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔════╝██╔════╝
// ██████╔╝██║██╔██╗ ██║███████║██████╔╝ ╚████╔╝ ██║   ██║██║   ██║█████╗  ██████╔╝██║  ██║██║   ██║███████╗█████╗
// ██╔══██╗██║██║╚██╗██║██╔══██║██╔══██╗  ╚██╔╝  ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██║  ██║██║   ██║╚════██║██╔══╝
// ██████╔╝██║██║ ╚████║██║  ██║██║  ██║   ██║   ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║██████╔╝╚██████╔╝███████║███████╗
// ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝╚══════╝
//
//

// Database connect
import './db/connect';

// Node
import { join }                        from 'path';

// Libs
import '@babel/polyfill';

// Binary Overdose Projects
import DataTable                       from 'bo-datatable';

// CryptoHub
import settings                        from './settings';
import startServer                     from './server';

// Formatters
import formatterCryptocompareBootstrap from './sources/cryptocompare/formatter-bootstrap.js';

// Sources
import cryptocompare                   from './sources/cryptocompare';
import coinmarketcap                   from './sources/coinmarketcap';
import messari                         from './sources/messari';
import xe                              from './sources/xe';

// Outputs
import data                            from './outputs/data';
import store                           from './outputs/store';

const logger = require('./logger');

try {

  process.on('warning', error => {
    logger.warning(`index.js:\n${error.stack}`);
  });

  startServer({
    dbDir: settings.dbDir,
    cacheDir: settings.cacheDir,
    server: {
      pub: join(__dirname, '../dist/public'),
      port: 3001,
      index: join(__dirname, '../dist/index.html'),
    },
    events: {
      data: {
        ...data
      },
      store: {
        ...store
      }
    }
  });

  const options = {

    dbDir: settings.dbDir,
    cacheDir: settings.cacheDir,
    generatedDir: settings.generatedDir,

    bootstrap: formatterCryptocompareBootstrap,

    events: {
      data: {
        ...data
      },
      store: {
        ...store
      }
    },

  };

  const datatable = new DataTable(options);

  datatable.newSource('cryptocompare', cryptocompare.config).then(() => {
    datatable.sources.cryptocompare.add(cryptocompare.coinList);
    datatable.sources.cryptocompare.add(cryptocompare.exchangesList);
    datatable.sources.cryptocompare.add(cryptocompare.topTotalVolume);
    datatable.sources.cryptocompare.add(cryptocompare.exchangesGeneral);
  });

  datatable.newSource('messari', messari.config).then(() => {
    datatable.sources.messari.add(messari.markets);
    datatable.sources.messari.add(messari.metrics);
  });

  datatable.newSource('coinmarketcap', coinmarketcap.config).then(() => {
    datatable.sources.coinmarketcap.add(coinmarketcap.cryptocurrencyListings);
  });

  datatable.newSource('xe', xe.config).then(() => {
    datatable.sources.xe.add(xe.currency);
  });

}

catch (error) {

  logger.error(`Um some error happened yo: ${error}`);
  process.exit(1);

}
