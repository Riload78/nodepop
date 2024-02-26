const Anuncio = require('../models/Anuncio')

/**
 * GET - ADS LIST
 * @param {*} skip
 * @param {*} limit
 * @param {*} tags
 * @param {*} venta
 * @param {*} precio
 * @param {*} nombre
 * @returns {object}
 */
const getAnuncios = async (skip, limit, tags, venta, precio, nombre) => {
  try {
    const anunciosDB = await Anuncio.list(skip, limit, tags, venta, precio, nombre)
    return { status: 'success', count: anunciosDB.length, data: anunciosDB }
  } catch (error) {
    console.log(`Error al obtener los anuncios de la base de datos: ${error}`)
    return error
  }
}

/**
 * GET - TAGS LIST
 * @returns {object}
 */
const getTags = async () => {
  try {
    const tags = await Anuncio.distinct('tags')
    return { status: 'success', count: tags.length, data: tags }
  } catch (error) {
    return error
  }
}

/**
 * POST - Create Ad
 * @param {object} data
 * @returns {object}
 */
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

/**
 * PUT - Update Ad by ID
 * @param {string} id
 * @param {object} data
 * @returns object
 */
const updateAnuncio = async (id, data) => {
  try {
    // Buscar y actualizar el registro correspondiente
    await Anuncio.findByIdAndUpdate(id, data, { new: true })
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = { getAnuncios, getTags, createAnuncio, updateAnuncio }
