const mongoose = require('mongoose');

const db = mongoose.connection;
const port = '23001';
const host = 'localhost';
const user = 'binaryoverdoseCode';
const pass = 'jO3yjOjOjuniOurshabadOO';
const database = 'binaryoverdose';
const replicaSet = 'rs01';
const authSource = 'admin';
const uri = `mongodb://${user}:${pass}@${host}:${port}/${database}?replicaSet=${replicaSet}&authSource=${authSource}`;

import { columnDependencies } from '../settings';
import { getIds } from './query';

// When successfully connected
db.on('connected', () => {
  console.log(`Mongoose default connection open to ${database}`);
});

// If the connection throws an error
db.on('error', error => {
  console.log(`Mongoose default connection error: ${error}`);
});

// When the connection is disconnected
db.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

mongoose.connect(uri, {
  poolSize: 10,
  useCreateIndex: true,
  auto_reconnect: true,
  useNewUrlParser: true
  // socketTimeoutMS: 0,
  // connectTimeoutMS: 0,
});

let startTime = +new Date();
let endTime;
let changes = [];

async function doEmit(changes) {

  let id;
  let data;
  let cols;
  let field;
  let socket;
  let change;
  let fields;

  const sockets = global.io.sockets.sockets;

  let idFields;
  if (sockets) {
    //
    // Get id fields instead of removing updates that dont have
    // changes to the ids
    //
    const ids = Array.from(new Set(changes.map(v => v.id)));
    idFields = await getIds(ids);
  }

  // Id fields are required for updates
  changes = [...changes, ...idFields];

  for (const socketId in sockets) {

    if ({}.hasOwnProperty.call(sockets, socketId)) {

      // Get socket and required fields
      socket = sockets[socketId];
      const cols = JSON.parse(socket.handshake.query.cols);
      const columns = cols.columns;
      fields = [];
      columns.forEach(v => {
        fields = fields.concat(v, columnDependencies[v]);
      });

      // Generate data by filtering by required fields
      data = {};
      for (change of changes) {
        id = change.id;
        field = change.field;
        if (fields.includes(field)) {
          if (!data[id]) data[id] = {};
          if (change.samples.length === 1) {
            change.samples = [change.samples[0], change.samples[0]];
          }
          data[id][field] = {
            lastChecked: change.lastChecked,
            lastValue: change.samples[0][1],
            timestamp: change.samples[1][0],
            value: change.samples[1][1]
          }
        }
      }

      //
      // Remove updates that:
      //   - are only Id fields
      //   - have no Id field
      //
      for (const [key, item] of Object.entries(data)) {
        if (!item['cc-total-vol-full-Id']) delete data[key];       // Required field(s)
        else if (Object.keys(item).length === 1) delete data[key]; // if there are only 3 fields they have to be Ids only
      }

      //
      // Emit
      //
      if (Object.keys(data).length) {
        const output = JSON.stringify({data, type: 'dbDiff'});
        socket.emit('data', output);
      }

    }

  }

}

//
// Streams
//
db.once('open', () => {

  const tsCollection = db.collection('tsseconds');
  const changeStream = tsCollection.watch({fullDocument: 'updateLookup'});

  changeStream.on('change', change => {
    if (change.fullDocument) {
      changes.push(change.fullDocument);
      if (+new Date() - startTime > 5000) {
        doEmit(changes);
        changes = [];
        startTime = +new Date();
      }
    }
  });
});
