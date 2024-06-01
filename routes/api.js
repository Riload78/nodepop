const express = require('express')
const router = express.Router()
const { AnuncioController } = require('../controllers')
const upload = require('../lib/multerMiddleware')

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
    const reply = await req.client.get('anuncios')

    if (reply) {
      const anuncios = JSON.parse(reply)
      req.client.quit()
      res.send(anuncios)
      return
    }
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
    await req.client.set('anuncios', JSON.stringify(result))
    req.client.quit()
    res.send(result)

  } catch (error) {
    customLogger.error(error)
    res.sendStatus(500) // comprobar esto
    next(error)
  }
})

router.post('/anuncios', upload.single('imagen'), async (req, res, next) => {
  const dataFromRequest = req.body
  const userId = req.user
  if (req.file) {
    dataFromRequest.imagen = req.file.filename
  } else {
    dataFromRequest.imagen = ''
  }
  const data = {
    ...dataFromRequest,
    imagen: dataFromRequest.imagen
  };
  console.log(data)

  try {
    const result = await createAnuncio(data, userId)
    if (!result.status) return res.status(400).send({ error: result.message })
    res.send(result)
  } catch (error) {
    customLogger.error(error)
    next(error)
  }
})

router.get('/anuncios/:id', async (req, res, next) => {
  const id = req.params.id
  const client = req.client
  const reply = await client.get(`anuncio-${id}`)
  if (reply) {
    const anuncio = JSON.parse(reply)
    req.client.quit()
    res.send(anuncio)
    return
  }

  try {
    const result = await getAnuncioById(id)
    if (!result.status) return res.status(400).send({ error: result.message })
    if (result.data === null) {
      return res.status(400).send({ error: `Ad with ID ${id} not found` })
    }
    await client.set(`anuncio-${id}`, JSON.stringify(result))
    req.client.quit()
    res.send(result)
  } catch (error) {
    customLogger.error(error)
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
    customLogger.error(error)
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
    customLogger.error(error)
    next(error)
  }
})

router.get('/tags', async (req, res, next) => {
  try {
    const result = await getTags()
    if (!result.status) return res.status(400).json(result.errors)
    res.send(result)
  } catch (error) {
    customLogger.error(error)
    next(error)
  }
})

module.exports = router
