'use strict';

import { join }     from 'path';
import http         from 'http';
import mkdirp       from 'mkdirp'
import express      from 'express';
import socketIO     from 'socket.io';
import compression  from 'compression';
import cookieParser from 'cookie-parser';

import { getRows }  from '../db/query';
import settings     from '../settings';

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

const logger = require('../logger');
global.io = io;

export default async function startServer(config) {

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

      socket.on('cols', async data => {

        const cols = JSON.parse(data);
        const sort = cols.sort;
        const columns = cols.columns.split(',');

        getRows(columns, sort, settings.maxRowsTemplatedIn).then(firstX => {
          const firstXStr = JSON.stringify({data: firstX, type: 'dbDiff'});
          socket.emit('data', firstXStr);
        });

        getRows(columns, sort).then(results => {
          const resultsStr = JSON.stringify({data: results, type: 'dbDiff'});
          socket.emit('data', resultsStr);
        });

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
