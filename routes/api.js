const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(JSON.stringify({ message: 'API is running' }))
})

module.exports = router
