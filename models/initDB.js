const { MongoClient } = require('mongodb')

const Anuncio = require('./anuncioSchema')

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'nodepop'
const collectionName = 'anuncios' // Nombre de la colección

const main = async () => {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')

  const db = client.db(dbName)

  // create Collection
  try {
    const collections = await db.listCollections().toArray()
    if (!collections.find((c) => c.name === collectionName)) {
      console.log(`Creating collection ${collectionName}`)
      await db.createCollection(collectionName)
      await Anuncio
    } else {
      console.log(`${collectionName} already exists`)
    }
  } catch (error) {
    console.log('Error al crear la colección', error)
  }

  // Insert  document into collection

  return 'done!!!!'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())
