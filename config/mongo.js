const mongoose = require('mongoose')
require('dotenv').config()

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const dbName = process.env.DB_NAME

const dbConnect = async () => {
  const DB_URI = `mongodb://${host}:${port}/${dbName}`

  try {
    await mongoose.connect(DB_URI)
    console.log('DB connected')
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`)
  }
}

module.exports = dbConnect
