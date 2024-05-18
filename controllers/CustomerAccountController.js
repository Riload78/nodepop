const { User, Anuncio } = require('../models')
const createError = require('http-errors')
const customLogger = require('../lib/winstonConfig')

const index = async (req, res, next) => {
  try {
    const userId = req.session.userId
    const user = await User.findById(userId).populate('adverts')
    if (!user) {
      next(createError(500, 'User not found'))
    }
    res.locals.subtitle = res.__('Customer Account')
    res.locals.user = user
    res.render('customer-account', { title: 'NODEPOP' })
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const advertId = req.params.id
    const userId = req.session.userId

    const user = await User.findOne({ _id: userId })
    const adverts = await user.adverts

    if (!user) {
      next(createError(500, 'User not found'))
    }
    const isAdvert = adverts.includes(advertId)
    if (!isAdvert) {
      customLogger.error('Warning: User id not have advert')
      next(createError(500, 'Product not found'))
    }
    if (userId !== user.id) {
      customLogger.error(500, 'Warning: User are not the same')
      next(createError(500, 'User not found'))
    }

    user.adverts.pull(advertId)
    await user.save()
    await Anuncio.findByIdAndDelete(advertId)
    res.redirect('/customer-account')
  } catch (error) {
    next(error)
  }
}

module.exports = { index, deleteProduct }
