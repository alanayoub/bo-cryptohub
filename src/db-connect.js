"use strict"

const mongoose = require('mongoose');

const uri = 'mongodb://localhost';
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

mongoose.connect(`${uri}/${database}`);
