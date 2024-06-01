const createError = require('http-errors')
const express = require('express')
const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const swaggerUI = require('swagger-ui-express')

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')
const swaggerDocs = require('./routes/api-docs')

const { LocaleController, LoginController, CustomerAccountController } = require('./controllers')
const jwtAuth = require('./lib/jwtAuthMiddleware')
const authSession = require('./lib/authMiddleware')
const{ dbConnect } = require('./config/mongo')
const { redisMiddleware } = require('./lib/redisMiddleware')

const i18n = require('./lib/i18nConfig')
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const dbName = process.env.DB_NAME
const app = express()

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '/logs/access.log'),
  {
    flags: 'a'
  }
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middelware
app.use(logger('common', { stream: accessLogStream }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(i18n.init)
app.use(express.static('public'))
app.use(helmet())
app.use(
  session({
    name: 'nodepop-session',
    secret: 'ieryihdfgheuhgu2345hsdjfhio564e654jgjgd',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: MongoStore.create({
      mongoUrl: `mongodb://${host}:${port}/${dbName}`
    })
  })
)

// locals
app.use((req, res, next) => {
  res.locals.session = req.session.id
  next()
})

// routes web
app.use('/', indexRouter)
app.get('/login', LoginController.index)
app.post('/login', LoginController.postLogin)
app.get('/logout', LoginController.logOut)
app.get('/change-locale/:locale', LocaleController.changeLocale)
app.get('/customer-account', authSession, CustomerAccountController.index)
app.get('/delete/:id', authSession, CustomerAccountController.deleteProduct)
// routes api
app.post('/apiv1/auth', LoginController.postAPIJWT)
app.use('/apiv1', jwtAuth, redisMiddleware, apiRouter)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  if (err.array) {
    const errInfo = err.array({})[0]
    console.log(errInfo)
    err.message = `Not valid - ${errInfo.type} in ${errInfo.location} ${errInfo.msg}`
    err.status = 422
  }

  // si el fallo es en el API -> responder en formato JSON
  if (req.originalUrl.startsWith('/apiv1/')) {
    res.json({ error: err })
    return
  }

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

//  Connect to DataBase
dbConnect()

module.exports = app
