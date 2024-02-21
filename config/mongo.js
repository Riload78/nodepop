const mongoose = require('mongoose')

const server = process.env.SERVER
const dbName = process.env.DB_NAME
// console.log(process.env)

const dbConnect = async () => {
  // const DB_URI = `mongodb://${server}/${dbName}`
  const DB_URI = 'mongodb://127.0.0.1:27017/nodepop'
  // Create a connection
  try {
    await mongoose.connect(DB_URI)
    console.log('DB connected')
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`)
  }
}

module.exports = dbConnect
