import { join } from 'path';
import uid from 'uid-safe';
import http from 'http';
import mkdirp from 'mkdirp'
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import socketIO from 'socket.io';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoStoreFactory from 'connect-mongo';

import passprt from './passport.js';
import routes from '../routes';
import logger from '../logger';
import settings from '../settings';
import { getRows }  from '../db/query';
import { UsersModel } from '../db/schema';

const app = express();
const server = http.Server(app);
const MongoStore = mongoStoreFactory(session);
const io = socketIO(server, {

  // what WebSocket server implementation to use.
  // Specified module must conform to the ws interface (see ws module api docs).
  // Default value is ws. An alternative c++ addon is also available by installing uws module.
  wsEngine: 'ws',

  // whether to serve the client files
  serveClient: false

});

global.io = io;

export default async function startServer(config) {

  process.on('SIGTERM', shutDown);
  process.on('SIGINT', shutDown);
  process.on('unhandledRejection', error => {
    logger.error(`index.js unhandledRejection: ${error}`);
  });

  //
  // Create folders
  // TODO: create these on demand instead of here
  //
  const eventsList = Object.keys(config.events);
  const folderTmpGenerated = join(config.cacheDir, 'tmp-generated');
  const folderOutput = join(config.cacheDir, 'out');
  for (const event of eventsList) {
    await mkdirp(join(folderTmpGenerated, event));
    await mkdirp(join(folderOutput, event));
  }

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
      sameSite: true,
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

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(compression());
  app.use(express.static(config.server.pub));
  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());

  passprt(passport);
  routes(app);

  logger.info('index.js: Starting server');

  let connections = [];
  server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => {
      connections = connections.filter(curr => curr !== connection);
    });
  });

  server.listen(config.server.port, () => {
    logger.info(`index.js: listening on *: ${config.server.port}`);
  });

  app.get('/privacy', respondPrivacy);
  app.get('/', respondDefault);

  io.on('connection', socketConnection);

  function respondPrivacy(req, res, next) {
    const privacy = join(__dirname, '../../dist/public/privacy.html');
    res.sendFile(privacy);
  }

  function respondDefault(req, res, next) {
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
  }

  let socket;
  async function socketConnection(sock) {
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

  }

  function shutDown() {

    console.log('Received kill signal, shutting down gracefully');
    server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);

  }

}
