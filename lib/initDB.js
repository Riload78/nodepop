const dbConnect = require('../config/mongo')
const Anuncio = require('../models/anuncioSchema')
const data = require('../data/anuncios.json')
const { default: mongoose } = require('mongoose')

const initDb = async () => {
  try {
    await dbConnect() // Conect to MongoDB
    await Anuncio.deleteMany({})// Delete all documents from the collection
    console.info('Database is clean')
    await Anuncio.insertMany(data.anuncios) // Insert data into the database
    console.info(`${data.anuncios.length} insert document`)
  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.connection.close()
    console.error('Connection is closed')
  }
}

initDb()
