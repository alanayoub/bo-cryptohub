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

// Server
import http         from 'http';
import mkdirp       from 'mkdirp'
import express      from 'express';
import socketIO     from 'socket.io';
import compression  from 'compression';
import cookieParser from 'cookie-parser';

const app = express();
app.use(compression());

const server = http.Server(app);
const io = socketIO(server, {

  // what WebSocket server implementation to use.
  // Specified module must conform to the ws interface (see ws module api docs).
  // Default value is ws. An alternative c++ addon is also available by installing uws module.
  wsEngine: 'ws',

  // whether to serve the client files
  serveClient: false

});

const logger = require('./logger');
global.io = io;

try {

  process.on('warning', error => {
    logger.warning(`index.js:\n${error.stack}`);
  });

  async function startServer(config) {

    app.use(cookieParser());
    app.use(express.static(config.server.pub));

    try {

      //
      // Setup server & socket
      //
      logger.info('index.js: Starting server');

      server.listen(config.server.port, () => {
        logger.info(`index.js: listening on *: ${config.server.port}`);
      });

      app.get('/', (req, res) => {
        console.log('file:', config.server.index);
        res.sendFile(config.server.index);
      });

      let socket;

      //
      // Everytime a user connects
      //
      io.on('connection', async sock => {

        logger.info(`User connected: ${sock.id}`);

        socket = sock;

        socket.on('cols', async columns => {

          console.log('received request for cols update');
          socket.handshake.query.cols = columns;
          //
          // TODO: emit from here
          //
          // let [ lastData ] = await that.cache.get(`${config.dbDir}/data/data.json`);
          // lastData = JSON.parse(lastData);
          // const emitData = config.events['data'].onBeforeEmit(socket, lastData, {});
          // if (emitData) {
          //   console.log('Emit data for cols update', columns);
          //   socket.emit('data', emitData);
          // };

        });

        socket.on('disconnect', () => {
          logger.info(`User disconnected: ${sock.id}`);
        });

        let conf;
        let data;
        let event
        for ([event, conf] of Object.entries(config.events)) {
          if (conf.onAfterConnect) {
            conf.onAfterConnect(event, socket);
          }
        }

      });

      const eventsList = Object.keys(config.events);
      let event;

      //
      // Create folders
      // NOTE: still have lots of other folders to create
      //
      const folderTmpGenerated = join(config.cacheDir, 'tmp-generated');
      const folderOutput = join(config.cacheDir, 'out');
      for (event of eventsList) {
        await mkdirp(join(folderTmpGenerated, event));
        await mkdirp(join(folderOutput, event));
      }

    }

    catch(error) {
      logger.error(`bo-datatable: Um some error happened yo: ${error}`);
      debugger
      process.exit(1);
    }

  }

  const config = {
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
    },
  }

  startServer(config);

  //
  // -------------------------------------------------------------------------------------------------------
  //
  // Order data is processed
  //
  // -------------------------------------------------------------------------------------------------------
  //
  //
  // #1 sectionconfig.formatter(response, timestamp, bootstrapDAta, appBootstrapData, fileName, event)
  //      return { data, timestamp };
  //
  //    The formatter receives the response data, the data that was scraped before any processing has happened
  //    This is where you should format the individual responses into a cohesive format for further processing
  //
  //
  // #2 sectionconfig.handler(oldData, newData)
  //      return { mergedData };
  //
  //    NOTE: rename from handler to ? // onFormatted(oldData, newData)
  //    This handler receives a copy of the previous sections formatted data and the new formatted data
  //    You can disguard the old data or use it for processing
  //    A single merged piece of data should be returned
  //
  //
  // #3 mergeHandlers[eventName](data)
  //      return data;
  //
  //    The merge handler receives all the formatted data for the same type of events in an object
  //    ```
  //    {
  //      coinList: coinListData,
  //      otherName: otherData
  //    }
  //    ```
  //
  //    In most cases you would merge the data into a single object or array and return it.
  //    You can however elect to keep it as is
  //
  //
  // #4 events[eventName](data, cache)
  //    cache.set(fileName, data);
  //    // return data;
  //
  //    NOTE: rename to eventsHandlers() for consistency
  //    The events handler builds the final output that gets emitted and saved to file
  //    TODO: change so the data is returned and the application saves the file
  //
  //

  //
  // TODO:
  //
  const options = {

    dbDir: settings.dbDir,
    cacheDir: settings.cacheDir,
    generatedDir: settings.generatedDir,

    //
    // TODO
    //
    // This is where you were.
    // make app wide bootstrap work, and clip data by maxRows or whatever its called.
    //
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
