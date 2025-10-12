const {createLogger, format, transports} = require('winston');
const path = require('path')

const devFormat = format.combine(
  format.colorize(),
  format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const prodFormat = format.combine(
  format.timestamp(),
  format.json()
);

const logger = createLogger({
    level: 'info',
    format: process.env.NODE_ENV === 'production' ? prodFormat : devFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
});

// logger.info("server started");
// logger.error("database connection failed");
// logger.warn("something might be wrong");

module.exports = logger;