const mongoose = require('mongoose')
require('dotenv').config()
const customLogger = require('../lib/winstonConfig')

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const dbName = process.env.DB_NAME

const dbConnect = async () => {
  const DB_URI = `mongodb://${host}:${port}/${dbName}`

  try {
    await mongoose.connect(DB_URI)
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`)
  }
}

mongoose.connection.on('error', (error) => customLogger.error(error.message))
mongoose.connection.on('open', () => customLogger.info('DB connected desde connection open'))

module.exports = dbConnect
