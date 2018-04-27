const winston = require('winston');
//
// Logging
// {error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5}
//
// const consoleFormat = winston.format.printf(info => {
//   return `${info.level}: ${info.message} (${moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ')})`;
// });
const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  transports: [
    // new winston.transports.Console({format: winston.format.simple(), humanReadableUnhandledException: true, colorize: true}),
    new winston.transports.Console({format: winston.format.combine(winston.format.colorize(), winston.format.simple())}),
    new winston.transports.File({filename: 'info.log', level: 'info'}),
    new winston.transports.File({filename: 'error.log', level: 'error'}),
  ]
});
module.exports=logger;
