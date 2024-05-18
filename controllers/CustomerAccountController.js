const { User } = require('../models')
const createError = require('http-errors')
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

module.exports = { index }
