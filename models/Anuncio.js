const mongoose = require('mongoose')
const Schema = mongoose.Schema

const anuncioSchema = new Schema({
  nombre: { type: String, required: true },
  venta: Boolean,
  precio: { type: Number, required: true },
  imagen: { type: String },
  tags: [String]
})

anuncioSchema.statics.list = (skip, limit, tags, venta, precio) => {
  const query = Anuncio.find()
  query.skip(skip)
  query.limit(limit)
  if (tags) {
    // Separa las etiquetas por comas y crea un array
    const tagArray = tags.split(',')

    // Agrega el filtro por etiquetas al query
    query.where('tags').in(tagArray)
  }
  if (venta && venta.toLowerCase() === 'true') {
    query.where('venta').equals(true)
  } else {
    query.where('venta').equals(false)
  }

  if (precio) {
    const range = precio.split('-')
    console.log(range)
    console.log(typeof range)
    console.log(range.length)

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

  return query.exec()
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema)

module.exports = Anuncio
