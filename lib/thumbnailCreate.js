const sharp = require('sharp')
const path = require('node:path')
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
        console.log(info)
      })
  } catch (error) {
    console.log(error)
  }
}

module.exports = thumbnailCreate
