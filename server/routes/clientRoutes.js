const express = require('express')
const router = express.Router()

const
{
  homeController,
  aboutController,
  contactController,
  projectController
}
= require('../controllers/index')

router.get('/', homeController)
router.get('/about', aboutController)
router.get('/contact', contactController)
router.get('/project/:id', projectController)

module.exports = router
