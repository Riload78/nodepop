const express = require('express')
const router = express.Router()
const { AnuncioController } = require('../controllers')
const {
  getAnuncios,
  getTags,
  createAnuncio,
  updateAnuncio,
  getAnuncioById,
  deleteAnuncio
} = AnuncioController

const customLogger = require('../lib/winstonConfig')

/* Info. */
router.get('/', async (req, res, next) => {
  res.send({
    message: 'Bienvenido a NodePOP API'
  })
})

router.get('/anuncios', async (req, res, next) => {
  try {
    const skip = req.query.skip
    const limit = req.query.limit
    const tags = req.query.tags
    const venta = req.query.venta
    const precio = req.query.precio
    const nombre = req.query.nombre
    const sort = req.query.sort

    const result = await getAnuncios(
      skip,
      limit,
      tags,
      venta,
      precio,
      nombre,
      sort
    )
    customLogger.info('Hola informacion')
    customLogger.debug(result)
    res.send(result)
  } catch (error) {
    customLogger.error(error)
    next(error)
  }
})

router.post('/anuncios', async (req, res, next) => {
  const data = req.body

  try {
    const result = await createAnuncio(data)
    if (!result.status) return res.status(400).send({ error: result.message })
    res.send(result)
  } catch (error) {
    customLogger.error(error)
    next(error)
  }
})

router.get('/anuncios/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const result = await getAnuncioById(id)
    if (!result.status) return res.status(400).send({ error: result.message })
    if (result.data === null) { return res.status(400).send({ error: `Ad with ID ${id} not found` }) }
    res.send(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.put('/anuncios/:id', async (req, res, next) => {
  const id = req.params.id
  const changes = req.body
  try {
    const result = await updateAnuncio(id, changes)
    if (!result.status) return res.status(400).send({ error: result.message })
    res.send(result)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.delete('/anuncios/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const result = await deleteAnuncio(id)
    if (!result.status) return res.status(400).send({ error: result.message })
    res.send(result)
  } catch (error) {
    next(error)
  }
})

router.get('/tags', async (req, res, next) => {
  try {
    const result = await getTags()
    if (!result.status) return res.status(400).json(result.errors)
    res.send(result)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: 'Ocurrió un error al obtener las etiquetas' })
  }
})

module.exports = router
