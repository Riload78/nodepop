const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const emailConfig = require("../lib/emailConfig");
const nodemailer = require("nodemailer");


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

userSchema.methods.sendMail = async function (subject, body) {
  const transporter = await emailConfig()
  const result = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: this.email,
    subject: subject,
    html: body
  })
  console.log(
		`URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`
	);
	return result;
}

const User = mongoose.model('User', userSchema) // Exporting the model.
module.exports = User
