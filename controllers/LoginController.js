const { User } = require('../models')

const customLogger = require('../lib/winstonConfig')
const index = (req, res) => {
  res.locals.subtitle = res.__('Login')
  res.locals.error = ''
  res.locals.email = ''
  res.locals.session = false
  res.render('login', { title: 'NODEPOP' })
}
const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // buscar usuario por email
    const user = await User.findOne({ email })
    if (!user || !(await user.verifyPassword(password))) {
      res.locals.subtitle = res.__('Login')
      res.locals.email = email
      res.locals.error = res.__('Wrong email or password')
      res.render('login', { title: 'NODEPOP' })
      return
    }

    req.session.userId = user._id
    res.redirect('/')
  } catch (error) {
    customLogger.error(error)
    next(error)
  }
}
const logOut = (req, res, next) => {
  req.session.regenerate(err => {
    if (err) {
      console.log(err)
      next(err)
    }
    res.redirect('/')
  })
}

module.exports = { index, postLogin, logOut }
