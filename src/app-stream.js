// Node
const cookieParser = require('cookie-parser');
const { join }     = require('path');
const crypto       = require('crypto');
const fs           = require('fs-extra');

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
      deleteFiles: false,
      cacheArgs: [settings.keyCryptohubAnalyticsTmp, 'newest'],
      handler: async (data, timestamp) => {
        settings.cache.set(settings.keyCryptohubAnalyticsOut, JSON.stringify(data));
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

    const filesList = settings.cache.get(settings.keyCryptohubAnalyticsTmp, 'all');
    const newestFileName = filesList.pop();
    if (newestFileName) {
      const newestFile = fs.readFileSync(newestFileName).toString();
      fs.writeFileSync(`${__dirname}/public/javascript/init-data.js`, `const initData = ${newestFile}`);
    }

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
