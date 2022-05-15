const express = require('express')
const router = express.Router()
const clientRoutes = require('./clientRoutes')
const prismicMiddleware = require('../middlewares/prismic')

router.use(prismicMiddleware)
router.use('/', clientRoutes)

module.exports = router
