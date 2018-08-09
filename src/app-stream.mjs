// Node
import * as cookieParser from "cookie-parser";
import path from 'path';

// Libs
import to from 'await-to-js';
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

// CryptoHub
import './settings';
import './db-connect';
import logger from './logger';
import settings from './settings';
import TimeseriesFast from './db-schema';
import commonDelay from './utils/common-delay.js';
import mapDbFields from './utils/map-db-fields.js';
/* import { commonDelay, mapDbFields: { shortToFull:m }} from '/utils/'; */

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);

// const cookieParser = require('cookie-parser');
// const { join } = require('path');

// // Libs
// const { to }  = require('await-to-js');
// const express = require('express');
// const app     = express();
// const server  = require('http').Server(app);
// const io      = require('socket.io')(server);


// // CryptoHub
// require('./settings');
// require('./db-connect');
// const logger             = require.main.require('./logger');
// const settings           = require.main.require('./settings');
// const { TimeseriesFast } = require.main.require('./db-schema');
// const { commonDelay, mapDbFields: { shortToFull:m } } = require.main.require('./utils/');


const port = 3000;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


process.on('warning', error => {
  logger.warn(error.stack);
});

(async function() {

  try {

    logger.info('Starting Stream');

    server.listen(port, () => {
      logger.info(`listening on *: ${port}`);
    });

    const sort = {_id: -1};
    const query = {};
    const fields = m['DATA'];
    let error;
    let socket;
    let results;
    let count = 0;
    async function getData() {
      [error, results] = await to(TimeseriesFast.findOne(query, fields, sort));
      results = results.toJSON();
      console.log('data', ++count);
      if (socket) {
        socket.emit('data', results);
      }
      await commonDelay(2000);
      getData();
    }
    getData();

    io.on('connection', function(sock) { //Communications established, now probably using websocket.
      socket = sock;
    });

    app.get('/', function(req, res) {
      res.sendFile(`${__dirname}/apps/stream/index.html`);
    });

  }

  catch(error) {
    logger.error(`Um some error happened yo: ${error}`);
    debugger
    process.exit(1);
  }

})();
