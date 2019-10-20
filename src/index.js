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
// import './db/connect';
import { db } from './db/connect';

// Libs
import '@babel/polyfill';

// Node
import { join }                           from 'path';

// Binary Overdose Projects
import DataTable                          from 'bo-datatable';
import { objectGetNestedProperty as gnp } from 'bo-utils';

// CryptoHub
import logger                             from './logger';
import settings                           from './settings';
import startServer                        from './server';
import getRows                            from './db/query/rows';
import { mapSave }                        from './db/save';

// Sources
import binaryoverdose                     from './sources/binaryoverdose';
import cryptocompare                      from './sources/cryptocompare';
import coinmarketcap                      from './sources/coinmarketcap';
import messari                            from './sources/messari';
import xe                                 from './sources/xe';

// Outputs
import data                               from './outputs/data';
import store                              from './outputs/store';

let initialised = false;

try {

  process.on('warning', error => {
    logger.warn(`index.js:\n${error.stack}`);
  });

  startServer({
    dbDir: settings.dbDir,
    cacheDir: settings.cacheDir,
    server: {
      pub: join(__dirname, '../dist/public'),
      port: 3001,
      index: join(__dirname, '../dist/public/index.html')
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

  db.on('connected', () => {

    if (initialised) return;
    console.log(`INITIALISING`);
    initialised = true;

    // generate some stuff
    getRows(null, false, false, ['cryptohub-name', 'cryptohub-symbol']).then(data => {
      let mapIdName = {};
      let mapCcNameSymbol = {};
      let name;
      let symbol;
      for (const [id, val] of Object.entries(data)) {
        name = gnp(val, 'cc-total-vol-full-FullName.value');
        symbol = gnp(val, 'cc-coinlist-Symbol.value');
        if (id && name) {
          mapIdName[id] = name;
        }
        if (name && symbol) {
          mapCcNameSymbol[name] = symbol;
        }
      }
      mapSave('projectMapIdName', JSON.stringify(mapIdName));
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
      }

    };

    const datatable = new DataTable(options);

    datatable.newSource('binaryoverdose', binaryoverdose.config).then(() => {
      datatable.sources.binaryoverdose.add(binaryoverdose.custom);
    });

    datatable.newSource('cryptocompare', cryptocompare.config).then(() => {
      datatable.sources.cryptocompare.add(cryptocompare.coinList);
      datatable.sources.cryptocompare.add(cryptocompare.social);
      datatable.sources.cryptocompare.add(cryptocompare.snapshot);
      datatable.sources.cryptocompare.add(cryptocompare.exchangesList);
      datatable.sources.cryptocompare.add(cryptocompare.topTotalVolume);
      datatable.sources.cryptocompare.add(cryptocompare.exchangesGeneral);
    });

    datatable.newSource('messari', messari.config).then(() => {
      datatable.sources.messari.add(messari.assets);
      //
      // NOTE: There doesn't seem to be a need for the below api requests. Investigate
      //
      // datatable.sources.messari.add(messari.markets);
      // datatable.sources.messari.add(messari.metrics);
      // datatable.sources.messari.add(messari.prices);
    });

     // datatable.newSource('coinmarketcap', coinmarketcap.config).then(() => {
     //   datatable.sources.coinmarketcap.add(coinmarketcap.cryptocurrencyListings);
     // });

     // datatable.newSource('xe', xe.config).then(() => {
     //   datatable.sources.xe.add(xe.currency);
     // });

  });


}

catch (error) {

  logger.error(`Um some error happened yo: ${error}`);
  process.exit(1);

}
