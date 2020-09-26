const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer-controller')


//Post=> localhost:3000/api/customers
router.post('/', customerController.post);

//GetAll=> localhost:3000/api/customers
router.get('/', customerController.getAll);

//GetById=> localhost:3000/api/customers/ID
router.get('/:customerId', customerController.getById);

module.exports = router;