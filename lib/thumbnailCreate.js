const sharp = require('sharp')
const path = require('node:path')
const customLogger = require('../lib/winstonConfig')
const thumbnailCreate = (srcImage) => {
  try {
    const thumbnailPath = path.join(__dirname, '../', 'public/images/thumbnail/')
    const imagePath = path.join(
      __dirname,
      '../',
      'public/images',
      `${srcImage}`
    )
    return sharp(imagePath)
      .resize({ width: 100 })
      .toFile(thumbnailPath + srcImage, function (err, info) {
        if (err) console.error(err)
        customLogger.info(`Thumbnail created for ${srcImage}: $(info)`)
      })
  } catch (error) {
    customLogger.error(error)
  }
}

module.exports = thumbnailCreate
