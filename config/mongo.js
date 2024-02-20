const mongoose = require('mongoose')

const dbConnect = async () => {
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
