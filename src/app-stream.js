// Node
const cookieParser = require('cookie-parser');
const { join }     = require('path');
const crypto       = require('crypto');

// Libs
const { to }  = require('await-to-js');
const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);

// CryptoHub
require('./settings');
require('./db-connect');
const logger             = require.main.require('./logger');
const settings           = require.main.require('./settings');
const { TimeseriesFast } = require.main.require('./db-schema');
const {
  commonDelay,
  classWatcher:Watcher,
  mapDbFields: { shortToFull:m }
} = require.main.require('./utils/');

const port = 3000;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, '/public')));

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

    const fileWatcher = new Watcher({
      delay: 100,
      cacheArgs: [settings.keyCryptohubAnalytics],
      handler: async (data, timestamp) => {
        return {data, timestamp};
      }
    });

    fileWatcher.on('data', ({data, timestamp}) => {
      if (!socket || !data) return;
      socket.emit('data', data);
      logger.info('emiting price data');
    });

    let socket;
    io.on('connection', sock => {
      socket = sock;
    });



    // let error;
    // let socket;
    // let results;
    // let count = 0;
    // async function getData() {
    //   let [results, age] = settings.cache.get(settings.keyCryptohubAnalytics, 'all');
    //   results = JSON.parse(results);
    //   console.log('data', ++count);
    //   if (socket) {
    //     console.log('price', results[1182]['cc-price-PRICE']);
    //     socket.emit('data', results);
    //   }
    //   await commonDelay(2000);
    //   getData();
    // }
    // getData();

    const replace = require('replace');

    let files = settings.cache.get(settings.keyCryptohubAnalytics, 'all');
    let filesList = Object.keys(files).sort();
    let newestFileName = filesList.pop();
    let newestFile = files[newestFileName];

    replace({
        regex: '/GENERATED_START(.*)GENERATED_END/',
        replacement: `GENERATED_START\n${newestFile}\nGENERATED_END`,
        paths: [`${__dirname}/apps/stream/`],
        recursive: false,
        silent: false,
    });
    debugger;

    app.get('/', (req, res) => {
      res.sendFile(`${__dirname}/apps/stream/index.html`);
    });

  }

  catch(error) {
    logger.error(`Um some error happened yo: ${error}`);
    debugger
    process.exit(1);
  }

})();
