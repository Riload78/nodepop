const express = require('express')
const router = express.Router()
const { getAnuncios, getTags, createAnuncio } = require('../controllers/anuncio')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send(JSON.stringify({ message: 'Bienvenido' }))
})

router.get('/anuncios', async (req, res, next) => {
  try {
    const result = await getAnuncios()
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
    const tags = await getTags()
    if (!tags) throw new Error('Error al obtener las etiquetas')
    const data = [{ tags }]
    res.send(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Ocurrió un error al obtener las etiquetas' })
  }
})

module.exports = router
