const express = require('express')
const router = express.Router()

const { getAnuncios } = require('../controllers/anuncio')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const skip = req.query.skip
  const limit = req.query.limit
  const tags = req.query.tags
  const venta = req.query.venta
  const precio = req.query.precio
  const nombre = req.query.nombre

  const result = await getAnuncios(skip, limit, tags, venta, precio, nombre)

  if (result.data.length === 0) {
    res.locals.error = { message: 'No se han encontrado anuncios' }
  } else {
    res.locals.error = null
  }

  res.locals.data = result.data
  res.locals.count = result.count
  res.render('index', { title: 'NodePOP' })
})

module.exports = router
