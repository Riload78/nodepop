const multer = require('multer')
const path = require('node:path')
const publisher = require('./amqp/publisher')

// decalarar una configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const ruta = path.join(__dirname, '..', 'public', 'images')
    callback(null, ruta)
  },
  filename: function (req, file, callback) {
    try {
      console.log(file)
      const parseOriginalname = file.originalname.split(' ').join('-')
      const filename = `${file.fieldname}-${Date.now()}-${parseOriginalname}`
      callback(null, filename)
      publisher({
        type: 'resize',
        image: filename
      }, 'resize')
    } catch (error) {
      callback(error)
    }
  }
})

// decalrar la configuración del upload
const upload = multer({ storage })

module.exports = upload
