const { User } = require('../models')
const jwt = require('jsonwebtoken')
const customLogger = require('../lib/winstonConfig')
const publisher = require('../lib/amqp/publisher')
const index = (req, res, next) => {
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
    res.redirect('/customer-account')
    
    publisher({
      subject: 'Login',
      email: user.email,
      body: `Welcome ${user.email}`
    }, 'email')
    customLogger.info(`User ${user.email} logged in`)
    
  } catch (error) {
    customLogger.error(error)
    next(error)
  }
}
const logOut = (req, res, next) => {
  req.session.regenerate((err) => {
    if (err) {
      next(err)
      return
    }
    res.redirect('/login')
  })
}

const postAPIJWT = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // buscar usuario por email
    const user = await User.findOne({ email })

    if (!user || !(await user.verifyPassword(password))) {
      return res.send({ error: 'Wrong email or password' })
    }

    const tokenJWT = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })
    res.json({ token: tokenJWT })
  } catch (error) {
    customLogger.error(error)
    next(error)
  }
}

module.exports = { index, postLogin, logOut, postAPIJWT }
