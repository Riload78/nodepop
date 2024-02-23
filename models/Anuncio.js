const mongoose = require('mongoose')
const Schema = mongoose.Schema

const anuncioSchema = new Schema({
  nombre: { type: String, required: true },
  venta: Boolean,
  precio: { type: Number, required: true },
  imagen: { type: String },
  tags: [String]
})

anuncioSchema.statics.list = (skip, limit, tags, venta) => {
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

  return query.exec()
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema)

module.exports = Anuncio
