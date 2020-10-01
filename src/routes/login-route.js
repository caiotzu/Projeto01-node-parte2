const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customer-controller')

router.post('/create', customerController.customerRegister)

module.exports = router;
