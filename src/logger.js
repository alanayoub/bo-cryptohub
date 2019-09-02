'use strict';

// Libs
const winston = require('winston');

// Cryptohub
const settings = require('./settings');

//
// {error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5}
//
const logger = winston.createLogger({
  level: 'silly',
  // format: winston.format.json(),
  exitOnError: false,
  timestamp: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
    new winston.transports.File({filename: 'logs/debug.log', level: 'debug'}),
    new winston.transports.File({filename: 'logs/info.log', level: 'info'}),
  ]
});

if (settings.logger) {
  logger.add(
    new winston.transports.Console({
      filename: 'logs/console.log',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        // winston.format.simple(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
      level: 'info'
    })
  );
}

module.exports = logger;
