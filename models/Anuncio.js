const mongoose = require('mongoose')
const Schema = mongoose.Schema

const anuncioSchema = new Schema({
  nombre: { type: String, required: true, minlength: 5, index: true },
  venta: { type: Boolean, default: false, required: true },
  precio: { type: String, required: true, index: true },
  imagen: { type: String },
  tags: [String]
})

anuncioSchema.statics.list = (skip, limit, tags, venta, precio, nombre, sort) => {
  const query = Anuncio.find()

  if (skip) {
    query.skip(skip)
  }

  if (limit) {
    query.limit(limit)
  }

  if (tags) {
    const tagArray = tags.split(',')
    query.where('tags').in(tagArray)
  }
  if (venta) {
    if (venta === 'true') {
      query.where('venta').equals(true)
    } else {
      query.where('venta').equals(false)
    }
  }

  if (precio) {
    const range = precio.split('-')

    if (range[1] === '') {
      query.where('precio').gt(range[0])
    } else if (range[0] === '') {
      query.where('precio').lt(range[1])
    } else if (range.length === 1) {
      query.where('precio').equals(Number(range[0]))
    } else {
      query.where('precio').gte(range[0]).lte(range[1])
    }
  }

  if (nombre) {
    const filters = new RegExp('^' + nombre, 'i')
    query.or([{ nombre: filters }])
  }

  if (sort) {
    query.sort(sort)
  }

  return query.exec()
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema)

module.exports = Anuncio
