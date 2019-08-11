const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017';
const database = 'binaryoverdose';

const db = mongoose.connection;

import { columnDependencies } from '../settings';

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
  // poolSize: 200,
  // auto_reconnect: true,
  // socketTimeoutMS: 0,
  // connectTimeoutMS: 0,
});

let startTime = +new Date();
let endTime;
let changes = [];

function doEmit(changes) {

  let id;
  let data;
  let cols;
  let field;
  let socket;
  let change;
  let fields;

  const sockets = global.io.sockets.sockets;
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
        // data[id][field] = change.samples;
        data[id][field]                = change.samples[1][1]; // value
        data[id][`${field}:last`]      = change.samples[0][1]; // last value
        data[id][`${field}-timestamp`] = change.samples[1][0]; // timestamp
      }
    }

    for (const [key, item] of Object.entries(data)) {
      if (!item['cc-total-vol-full-Id']) delete data[key]; // Required field(s)
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
    if ((+new Date() - startTime) > 1000) {
      doEmit(changes);
      changes = [];
      startTime = +new Date();
    }
  });
});
