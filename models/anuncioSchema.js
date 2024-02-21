const mongoose = require('mongoose')
const Schema = mongoose.Schema

const anuncioSchema = new Schema({
  nombre: { type: String, required: true },
  venta: Boolean,
  precio: { type: Number, required: true },
  imagen: { type: String },
  tags: [String]
})

const Anuncio = mongoose.model('Anuncio', anuncioSchema)

module.exports = Anuncio
