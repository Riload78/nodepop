const express = require('express')
const router = express.Router()
const { getAnuncios, getTags, createAnuncio } = require('../controllers/anuncio')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send(JSON.stringify({ message: 'Bienvenido' }))
})

router.get('/anuncios', async (req, res, next) => {
  try {
    const skip = req.query.skip
    const limit = req.query.limit
    const tags = req.query.tags
    const venta = req.query.venta
    const precio = req.query.precio

    const result = await getAnuncios(skip, limit, tags, venta, precio)
    res.send(result)
  } catch (error) {
    console.log(error)
  }
})

router.post('/anuncios', async (req, res, next) => {
  const data = req.body
  console.log(data)
  try {
    const result = await createAnuncio(data)

    if (!result.status) return res.status(400).json(result.errors)
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
