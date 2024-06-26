const winston = require('winston')

const customLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()

  ),
  defaultMeta: { service: 'nodepop' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' })
  ],

  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ]
})

module.exports = customLogger
