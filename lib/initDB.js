const { dbConnect, disconnectDB } = require('../config/mongo')
const { Anuncio, User } = require('../models')
const dataUser1 = require('../data/anunciosUser_1.json')
const dataUser2 = require('../data/anunciosUser_2.json')
const { mongoose } = require('mongoose')
const readline = require('node:readline')
const publisher = require('./amqp/publisher')
const path = require('node:path')

const fs = require('node:fs')

const initDb = async () => {
  try {
    await cleanImages()
    await cleanThumbnail()
    await dbConnect() // Conect to MongoDB
    await initUsers()
    await initAdverts()
  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.connection.close()
    console.error('Connection is closed')
    process.exit()
  }
}

const initAdverts = async () => {
  try {
    const ask = await confirm(
      'The Adverts database was deleted. Are yor sure? (y/n) ',
    )
    if (!ask) process.exit()
    await Anuncio.deleteMany({})
    console.info('Database is clean')
    const adverts = await Anuncio.insertMany(dataUser1.anuncios)
    adverts.forEach((advert) => {
      publisher(
        {
          type: 'resize',
          image: advert.imagen,
        },
        'resize',
      )
    })
    const user1 = await User.findOne({ email: 'user@example.com' })
    user1.adverts = adverts.map((advert) => advert._id)
    await User.findOne({ email: 'test@example.com' }).populate({
      path: 'adverts',
      model: 'Anuncio',
      select: 'nombre venta precio imagen tags',
    })
    await user1.save()

    const adverts2 = await Anuncio.insertMany(dataUser2.anuncios)
    adverts2.forEach((advert) => {
      publisher(
        {
          type: 'resize',
          image: advert.imagen,
        },
        'resize',
      )
    })
    const user2 = await User.findOne({ email: 'user2@example.com' })
    user2.adverts = adverts2.map((advert) => advert._id)
    await User.findOne({ email: 'test2@example.com' }).populate({
      path: 'adverts',
      model: 'Anuncio',
      select: 'nombre venta precio imagen tags',
    })
    await user2.save()

    console.info(`${dataUser1.anuncios.length} insert document`)
  } catch (error) {
    console.error(error)
  }
}

const initUsers = async () => {
  try {
    const ask = await confirm(
      'The Users database was deleted. Are yor sure? (y/n) ',
    )
    if (!ask) process.exit()
    await User.deleteMany({}) // Delete all documents from the collection
    console.info('User Database is clean')
    const userData = await User.insertMany([
      {
        email: 'user@example.com',
        password: await User.hashPassword('1234'),
      },
      {
        email: 'user2@example.com',
        password: await User.hashPassword('1234'),
      },
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
      output: process.stdout,
    })
    ifc.question(question, (respuesta) => {
      ifc.close()
      resolve(respuesta.toLowerCase() === 'y')
    })
  })
}

const cleanThumbnail = async () => {
  const thumbnailPath = path.join(__dirname, '../public/images/thumbnail/')
  
  try {
    const ask = await confirm(
      'The Images database was deleted. Are yor sure? (y/n) ',
    )
    if (!ask) process.exit()
    fs.readdir(thumbnailPath, (err, files) => {
      if (err) {
        console.error(err)
        return
      }

      files.forEach((file) => {
        const filePath = path.join(thumbnailPath, file)
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err)
            return
          }
          console.log(`Archivo eliminado: ${file}`)
        })
      })
    })
    console.info('Images Database is clean')
  } catch (error) {
    console.error(error)
  }
  return
}

const cleanImages = async () => {
  const imagesPath = path.join(__dirname, '../public/images/')
  try {
    const ask = await confirm(
      'The Images database was deleted. Are yor sure? (y/n) ',
    )
    if (!ask) process.exit()
    fs.readdir(imagesPath, (err, files) => {
      if (err) {
        console.error(err)
        return
      }

      files.forEach((file) => {
        if (file.startsWith('imagen-')) {
          console.log(`Archivo encontrado: ${file}`)
          const filePath = path.join(imagesPath, file)
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err)
              return
            }
            console.log(`Archivo eliminado: ${file} - ${directory}`)
          })
        }
      })
    })
    console.info('Images Database is clean')
  } catch (error) {
    console.error(error)
  }
}

initDb()
