const { Anuncio, User } = require('../models')
const customLogger = require('../lib/winstonConfig')

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

const getAnuncios = async (skip, limit, tags, venta, precio, nombre, sort) => {
  try {
    const anunciosDB = await Anuncio.list(skip, limit, tags, venta, precio, nombre, sort)
    return { status: 'success', count: anunciosDB.length, data: anunciosDB }
  } catch (error) {
    customLogger.error(`Error getting ads from database: ${error}`)
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
    customLogger.error(`Error getting tags from database: ${error}`)
    return error
  }
}

/**
 * POST - Create Ad
 * @param {object} data
 * @returns {object}
 */

const createAnuncio = async (data, userId) => {
  const newAnuncio = new Anuncio(data)
  try {
    await newAnuncio.save()
    const newUser = await User.findById(userId)
    newUser.adverts.push(newAnuncio._id)
    await newUser.save()
    return { status: 'success', message: 'The ad has been created successfully' }
  } catch (error) {
    customLogger.error(`Error saving ad to database: ${error}`)
    return error
  }
}

/**
 * GET - Get ad bi ID
 * @param {string} id
 * @returns {object}
 */

const getAnuncioById = async (id) => {
  try {
    const result = await Anuncio.findById(id)
    return { status: 'success', data: result }
  } catch (error) {
    customLogger.error(`Error getting ad from database: ${error}`)
    return error
  }
}

/**
 * PUT - Update Ad by ID
 * @param {string} id
 * @param {object} data
 * @returns {object}
 */

const updateAnuncio = async (id, changes) => {
  try {
    // Buscar y actualizar el registro correspondiente
    await Anuncio.findByIdAndUpdate(id, changes, { new: true })
    return { status: 'success', data: changes }
  } catch (error) {
    customLogger.error(`Error updating ad from database: ${error}`)
    return error
  }
}

/**
 * DELETE - Delete Ad
 * @param {string} id
 * @returns {Object}
 */

const deleteAnuncio = async (id) => {
  try {
    await Anuncio.deleteOne(({ _id: id }))
    return { status: 'success', message: `The ad with id "${id}" was removed` }
  } catch (error) {
    customLogger.error(`Error deleting ad from database: ${error}`)
  }
}

module.exports = { getAnuncios, getTags, createAnuncio, updateAnuncio, getAnuncioById, deleteAnuncio }
