const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')

const swaggerUI = require('swagger-ui-express')

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')
const swaggerDocs = require('./routes/api-docs')

const dbConnect = require('./config/mongo')

const i18n = require('./lib/i18nConfig')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middelware
app.use(logger('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(i18n.init)
app.use(express.static('public'))

app.use(helmet())
app.use('/', indexRouter)
app.use('/apiv1', apiRouter)
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
