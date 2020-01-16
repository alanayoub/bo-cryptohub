import { join }     from 'path';
import uid          from 'uid-safe';
import http         from 'http';
import mkdirp       from 'mkdirp'
import express      from 'express';
import socketIO     from 'socket.io';
import compression  from 'compression';
import cookieParser from 'cookie-parser';

import session           from 'express-session';
import mongoStoreFactory from 'connect-mongo';

import { getRows }  from '../db/query';
import settings     from '../settings';

import { UsersModel } from '../db/schema';
const MongoStore = mongoStoreFactory(session);

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

  const sess = {
    ttl: 60 * 30,
    //
    // [security]
    // By providing a name property with a value of “id” it will be that much more difficult
    // for any attacker to determine the underlying mechanisms used by our application
    //
    name: 'sId',
    store: new MongoStore({
      mongooseConnection: config.db
    }),
    secret: 'uGzabt3ZnNn^T5SW',
    resave: true, // don't save session if unmodified
    cookie: {
      path: '/',
      httpOnly: false, // httpOnly=false because of Segment :/
      secure: false,
      maxAge: null
    },
    saveUninitialized: true, // don't create session until something is stored
  }

  // HTTPS if prod
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
  }

  app.set('view engine', 'html');

  // persistence store of our session
  app.use(session(sess));

  try {

    //
    // Setup server & socket
    //
    logger.info('index.js: Starting server');

    server.listen(config.server.port, () => {
      logger.info(`index.js: listening on *: ${config.server.port}`);
    });

    app.get('/privacy', (req, res, next) => {
      const privacy = join(__dirname, '../../dist/public/privacy.html');
      res.sendFile(privacy);
    });

    app.get('/', (req, res, next) => {

      const sId = req.session.id;
      const aId = req.cookies.aId;
      const lastIpAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      // If no anonymouseId create one
      if (aId === undefined) {

        // To create a UID of length 24, you want a byte length of 18
        uid(18).then(newAId => {
          // httpOnly=false because of Segment :/
          res.cookie('aId', newAId, {maxAge: (10 * 365 * 24 * 60 * 60), httpOnly: false});
          UsersModel.create({
            lastIpAddress,
            anonymousId: newAId,
            sessionId: sId
          });
        });
      } else {
        // upsert sessionId
        const query = {anonymousId: aId};
        const update = {lastIpAddress, sessionId: sId};
        UsersModel.findOneAndUpdate(query, update, {upsert: true}, (error, doc) => {
          if (error) {
            logger.error({error: error});
          }
        });

      }

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

        socket.handshake.query.cols = data;
        const cols = JSON.parse(data);
        const sort = cols.sort;
        const columns = cols.columns.split(',');
        getRows(columns, sort).then(results => {
          const resultsStr = JSON.stringify({data: results, type: 'dbDiff'});
          socket.emit('rows-full', resultsStr);
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

  catch (error) {
    logger.error(`bo-datatable: Um some error happened yo: ${error}`);
    process.exit(1);
  }

}
