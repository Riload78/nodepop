const express = require('express')
const router = express.Router()
const getAnuncios = require('../controllers/anuncio')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send(JSON.stringify({ message: 'Bienvenido' }))
})

router.get('/anuncios', async (req, res, next) => {
  try {
    // const anuncios = await Anuncio.find()
    const data = await getAnuncios()
    console.log(data)
    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
