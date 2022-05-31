const express = require('express')
const router = express.Router()
const
{
  homeController,
  aboutController,
}
= require('../controllers/index')

router.get('/', homeController)
router.get('/about', aboutController)

module.exports = router
