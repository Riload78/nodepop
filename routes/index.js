const express = require('express')
const router = express.Router()

const { AnuncioController } = require('../controllers')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const skip = req.query.skip
  const limit = req.query.limit
  const tags = req.query.tags
  const venta = req.query.venta
  const precio = req.query.precio
  const nombre = req.query.nombre
  const sort = req.query.sort

  const result = await AnuncioController.getAnuncios(
    skip,
    limit,
    tags,
    venta,
    precio,
    nombre,
    sort
  )

  if (result.data.length === 0) {
    res.locals.error = { message: 'No se han encontrado anuncios' }
  } else {
    res.locals.error = null
  }
  if (!req.session.userId) {
    res.redirect('/login')
  }
  res.locals.data = result.data
  res.locals.count = result.count
  res.locals.subtitle = res.__('Home')
  res.locals.session = req.session.userId

  res.render('index', { title: 'NodePOP' })
})

module.exports = router
