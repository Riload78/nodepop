const express = require('express')
const router = express.Router()
const { getAnuncios, getTags, createAnuncio, updateAnuncio } = require('../controllers/anuncio')

/* Info. */
router.get('/', async (req, res, next) => {
  res.send(
    {
      message: 'Bienvenido a NodePOP API',
      docs: 'http://localhost:3000/api-docs/#/Anuncios/getAnuncios'
    }
  )
})

router.get('/anuncios', async (req, res, next) => {
  try {
    const skip = req.query.skip
    const limit = req.query.limit
    const tags = req.query.tags
    const venta = req.query.venta
    const precio = req.query.precio
    const nombre = req.query.nombre

    const result = await getAnuncios(skip, limit, tags, venta, precio, nombre)
    res.send(result)
  } catch (error) {
    console.log(error)
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
    console.error(error)
    next(error)
  }
})

router.put('/anuncios/:id', async (req, res, next) => {
  const id = req.params.id
  const changes = req.body
  try {
    const result = await updateAnuncio(id, changes)
    res.send(result)
  } catch (error) {
    console.error(error)
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
    res.status(500).json({ error: 'Ocurrió un error al obtener las etiquetas' })
  }
})

module.exports = router
