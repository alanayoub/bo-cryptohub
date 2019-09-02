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

// Libs
import '@babel/polyfill';

// Node
import { join }                           from 'path';

// Binary Overdose Projects
import DataTable                          from 'bo-datatable';
import { objectGetNestedProperty as gnp } from 'bo-utils';

// CryptoHub
import settings                           from './settings';
import startServer                        from './server';

// Sources
import binaryoverdose                     from './sources/binaryoverdose';
import cryptocompare                      from './sources/cryptocompare';
import coinmarketcap                      from './sources/coinmarketcap';
import messari                            from './sources/messari';
import xe                                 from './sources/xe';

// Outputs
import data                               from './outputs/data';
import store                              from './outputs/store';

import { mapSave }                        from './db/save';
import getRows                            from './db/query/rows';

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

  // generate some stuff
  getRows(null, false, false, ['cc-total-vol-full-FullName', 'cc-coinlist-Symbol']).then(data => {
    let mapIdName = {};
    let mapSymbolId = {};
    let mapIdSymbol = {};
    let mapCcNameSymbol = {};
    let name;
    let symbol;
    for (const [id, val] of Object.entries(data)) {
      name = gnp(val, 'cc-total-vol-full-FullName.value');
      symbol = gnp(val, 'cc-coinlist-Symbol.value');
      if (name && symbol) {
        mapIdName[id] = name;
        mapSymbolId[symbol] = id;
        mapIdSymbol[id] = symbol;
        mapCcNameSymbol[name] = symbol;
      }
    }
    mapSave('projectMapIdName', JSON.stringify(mapIdName));
    mapSave('projectMapSymbolId', JSON.stringify(mapSymbolId));
    mapSave('projectMapIdSymbol', JSON.stringify(mapIdSymbol));
    mapSave('projectCcMapNameSymbol', JSON.stringify(mapCcNameSymbol));
  });

  const options = {

    dbDir: settings.dbDir,
    cacheDir: settings.cacheDir,
    generatedDir: settings.generatedDir,

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

  datatable.newSource('binaryoverdose', binaryoverdose.config).then(() => {
    datatable.sources.binaryoverdose.add(binaryoverdose.custom);
  });

  datatable.newSource('cryptocompare', cryptocompare.config).then(() => {
    datatable.sources.cryptocompare.add(cryptocompare.coinList);
    datatable.sources.cryptocompare.add(cryptocompare.exchangesList);
    datatable.sources.cryptocompare.add(cryptocompare.topTotalVolume);
    datatable.sources.cryptocompare.add(cryptocompare.exchangesGeneral);
  });

  datatable.newSource('messari', messari.config).then(() => {
    // TODO: Assets only returns 20 results for some reason
    // datatable.sources.messari.add(messari.assets);
    datatable.sources.messari.add(messari.markets);
    datatable.sources.messari.add(messari.metrics);
    datatable.sources.messari.add(messari.prices);
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
