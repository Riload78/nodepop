const Anuncio = require('../models/Anuncio')

const getAnuncios = async (skip, limit, tags, venta, precio, nombre) => {
  try {
    const anunciosDB = await Anuncio.list(skip, limit, tags, venta, precio, nombre)
    return { status: 'success', data: anunciosDB }
  } catch (error) {
    console.log(`Error al obtener los anuncios de la base de datos: ${error}`)
    return error
  }
}

const getTags = async () => {
  try {
    const tags = await Anuncio.distinct('tags')
    return { status: 'success', data: tags }
  } catch (error) {
    return error
  }
}

const createAnuncio = async (data) => {
  const newAnuncio = new Anuncio(data)
  try {
    await newAnuncio.save()
    return { status: 'success', msg: 'El anuncio se ha creado correctamente' }
  } catch (error) {
    console.log(`Hubo un error al guardar el anuncio en la BD: ${error}`)
    return error
  }
}
module.exports = { getAnuncios, getTags, createAnuncio }
