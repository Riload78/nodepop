const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adverts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio' }]
})

userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 7)
}

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema) // Exporting the model.
module.exports = User
