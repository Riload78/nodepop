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

  const result = await getAnuncios(skip, limit, tags, venta, precio)

  res.locals.data = result.data
  res.render('index', { title: 'Express' })
})

module.exports = router
