const { User } = require('../models')

const customLogger = require('../lib/winstonConfig')
const index = (req, res) => {
  res.locals.subtitle = res.__('Login')
  res.locals.error = ''
  res.locals.email = ''
  res.render('login', { title: 'NODEPOP' })
}
const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // buscar usuario por email
    const user = await User.findOne({ email })
    if (!user || user.password !== password) {
      res.locals.subtitle = res.__('Login')
      res.locals.email = email
      res.locals.error = res.__('Wrong email or password')
      res.render('login', { title: 'NODEPOP' })
      return
    }

    customLogger.debug('Login attempt: ' + email + ' ' + password)
    req.session.user = user
    res.redirect('/')
  } catch (error) {
    customLogger.error(error)
    next(error)
  }
}

module.exports = { index, postLogin }
