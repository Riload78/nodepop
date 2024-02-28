const mongoose = require('mongoose')
require('dotenv').config()

const server = process.env.SERVER
const dbName = process.env.DB_NAME

const dbConnect = async () => {
  const DB_URI = `mongodb://${server}/${dbName}`

  try {
    await mongoose.connect(DB_URI)
    console.log('DB connected')
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`)
  }
}

module.exports = dbConnect
