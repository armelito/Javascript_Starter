const { __DEV__ } = require('./utils')

const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const errorHandler = require('errorhandler')
const path = require('path')
const cors = require('cors')
const routes = require('./routes/index')
const errorMiddleware = require('./middlewares/error')

module.exports = (() =>
{
  const server = express()
  const PORT = process.env.PORT || 3000

  if (__DEV__)
  {
    require('dotenv').config()

    const logger = require('morgan')
    server.use(logger('dev'))
  }

  server.set('port', PORT)
  server.set('view engine', 'pug')
  server.set('views', path.join(__dirname, '../src/views'))
  server.locals.basedir = server.get('views')

  server.use(cors())
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(errorMiddleware)
  server.use(methodOverride())
  server.use(errorHandler())
  server.use('/', routes)
  server.use(express.static(path.join(__dirname, '../public')))

  return server
})()
