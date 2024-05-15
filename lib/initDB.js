const dbConnect = require('../config/mongo')
const { Anuncio, User } = require('../models')
const data = require('../data/anuncios.json')
const { default: mongoose } = require('mongoose')
const readline = require('node:readline')

const initDb = async () => {
  try {
    await dbConnect() // Conect to MongoDB
    await initAdverts()
    await initUsers()
  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.connection.close()
    console.error('Connection is closed')
  }
}

const initAdverts = async () => {
  try {
    const ask = await confirm(
      'The Adverts database was deleted. Are yor sure? (y/n) '
    )
    if (!ask) process.exit()
    await Anuncio.deleteMany({}) // Delete all documents from the collection
    console.info('Database is clean')
    await Anuncio.insertMany(data.anuncios) // Insert data into the database
    console.info(`${data.anuncios.length} insert document`)
  } catch (error) {
    console.error(error)
  }
}

const initUsers = async () => {
  try {
    const ask = await confirm(
      'The Users database was deleted. Are yor sure? (y/n) '
    )
    if (!ask) process.exit()
    await User.deleteMany({}) // Delete all documents from the collection
    console.info('User Database is clean')
    const userData = await User.insertMany([
      {
        email: 'test@example.com',
        password: await User.hashPassword('123456')
      },
      {
        email: 'test2@example.com',
        password: await User.hashPassword('123456')
      }
    ]) // Insert data into the database
    console.info(`${userData.length} Users inserted in document`)
  } catch (error) {
    console.error(error)
  }
}

const confirm = async (question) => {
  return new Promise((resolve, reject) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    ifc.question(question, (respuesta) => {
      ifc.close()
      resolve(respuesta.toLowerCase() === 'y')
    })
  })
}

initDb()
