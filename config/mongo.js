const mongoose = require('mongoose')
require('dotenv').config()
const customLogger = require('../lib/winstonConfig')

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const dbName = process.env.DB_NAME
const dbTestName = process.env.DB_TEST_NAME
const database_uri = process.env.DATABASE_URI
const database_uri_test = process.env.DATABASE_URI_TEST

const dbConnect = async () => {
  let DB_URI = database_uri

  try {
    if (process.env.NODE_ENV === 'test') {
      DB_URI = database_uri_test
    }
    await mongoose.connect(DB_URI)
  } catch (error) {
    customLogger.error(error)
  }
}

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

mongoose.connection.on('error', (error) => customLogger.error(error.message))
//mongoose.connection.on('open', () => customLogger.info('DB connected desde connection open'))

module.exports = {dbConnect, disconnectDB}
