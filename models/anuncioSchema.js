const mongoose = require('mongoose')
const Schema = mongoose.Schema

const anuncioSchema = new Schema({
  nombre: { type: String, required: true }, // Nombre del producto o servicio
  venta: Boolean, // True si es para ventas, false para alquileres
  precio: { type: Number, required: true }, // Precio del producto/servicio (en euros)
  foto: { type: String }, // Fotografía del producto en formato de imagen
  tags: [String] // Palabras clave que describen el producto o servicio
})

const Anuncio = mongoose.model('Anuncio', anuncioSchema)

module.exports = Anuncio
