const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017';
const database = 'cryptoHub';

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${uri}`);
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

mongoose.connect(`${uri}/${database}`, {useNewUrlParser: true});

//
// Playing around with setting up a replica set and using streams
// Going to just pole evey couple of seconds for now as we will have
// new data very regularly and I dont want replica sets right now for
// space reasons
//

// // Libs
// const { ReplSet } = require('mongodb-topology-manager');
// const mongoose = require('mongoose');
// const database = 'cryptoHub';

// // CryptoHub
// const logger = require.main.require('./logger');

// module.exports = async function startDatabase() {

//   try {
//     console.log(new Date(), 'Connecting to database...');
//     const bind_ip = 'localhost';
//     // Starts a 3-node replica set on ports 31000, 31001, 31002, replica set
//     // name is "rs0".
//     // const path = '/var/lib/mongodb';
//     const replSet = new ReplSet('mongod', [
//       {options: {port: 31000, dbpath: `${__dirname}/data/db/31000`, bind_ip}},
//       {options: {port: 31001, dbpath: `${__dirname}/data/db/31001`, bind_ip}},
//       {options: {port: 31002, dbpath: `${__dirname}/data/db/31002`, bind_ip}}
//     ], { replSet: 'rs0' });

//     // mongo --host rs0/localhost:31000,localhost:31001,localhost:31001

//     // Initialize the replica set
//     await replSet.purge();
//     await replSet.start();
//     console.log(new Date(), 'Replica set started...');

//     // Connect to the replica set
//     const uri = `mongodb://localhost:31000,localhost:31001,localhost:31002/${database}?replicaSet=rs0`;
//     mongoose.set('debug', true);
//     await mongoose.connect(uri);

//     console.log(new Date(), 'Connected to DB');

//     // To work around "MongoError: cannot open $changeStream for non-existent
//     // database: test" for this example
//     // await mongoose.connection.createCollection('people');

//     // const Person = mongoose.model('Person', new mongoose.Schema({ name: String }));

//     // Create a change stream. The 'change' event gets emitted when there's a
//     // change in the database
//     // Person.watch().
//     //   on('change', data => console.log(new Date(), data));

//     // Insert a doc, will trigger the change stream handler above
//     // console.log(new Date(), 'Inserting doc');
//     // await Person.create({ name: 'Axl Rose' });
//     // console.log(new Date(), 'Inserted doc');
//   }
//   catch(error) {
//     logger.error(`Error starting database ${error}`);
//   }

// };
