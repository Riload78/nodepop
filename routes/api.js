const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    // const anuncios = await Anuncio.find()
    res.send(JSON.stringify({ message: 'API is running' }))
  } catch (error) {
    console.log(error)
  }
})

router.get('/anuncios', (req, res, next) => {
  // get list anuncios
  res.send(JSON.stringify({ message: 'Listado de anuncios' }))
})

module.exports = router
