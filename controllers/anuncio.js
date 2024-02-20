const Anuncio = require('../models/anuncioSchema')

const getAnuncios = async () => {
  try {
    const anunciosDB = await Anuncio.find()
    return anunciosDB
  } catch (error) {
    console.log('Error al obtener los anuncios de la base de datos')
    return error
  }
}
module.exports = getAnuncios
