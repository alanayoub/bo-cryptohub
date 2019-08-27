const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017';
const database = 'binaryoverdose';

const db = mongoose.connection;

import { columnDependencies } from '../settings';
import { getIds } from './query';

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${uri}`);

  // // Select DB and Collection
  // const db = client.db("mydb");
  // const collection = db.collection("Stocks");
  // pipeline = [
  //   {
  //     $match: { "fullDocument.price": { $gte: 250 } }
  //   }
  // ];
  // // Define change stream
  // const changeStream = collection.watch(pipeline);
  // // start listen to changes
  // changeStream.on("change", function(event) {
  //   console.log(JSON.stringify(event));
  // });

});

// If the connection throws an error
mongoose.connection.on('error', error => {
  console.log(`Mongoose default connection error: ${error}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

mongoose.connect(`${uri}/${database}?replicaSet=rs01`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  // poolSize: 200,
  // auto_reconnect: true,
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
    // Get id fields instead of removing updates that dont have changes to the ids
    //
    const ids = Array.from(new Set(changes.map(v => v._id.split(':')[1])));
    idFields = await getIds(ids);
  }

  // Id fields are required for updates
  changes = [...changes, ...idFields];

  for (const socketId in sockets) {

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
      [ field, id ] = change._id.split(':');
      if (fields.includes(field)) {
        if (!data[id]) data[id] = {};
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

//
// Streams
//
mongoose.connection.once('open', () => {

  const tsCollection = mongoose.connection.collection('tsseconds');
  const changeStream = tsCollection.watch({fullDocument: 'updateLookup'});

  changeStream.on('change', change => {
    changes.push(change.fullDocument);
    if ((+new Date() - startTime) > 5000) {
      doEmit(changes);
      changes = [];
      startTime = +new Date();
    }
  });
});
