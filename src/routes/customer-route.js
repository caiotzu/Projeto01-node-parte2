const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer-controller')


//Post=> localhost:3000/api/customers
router.post('/', customerController.post);

//GetAll=> localhost:3000/api/customers
router.get('/', customerController.getAll);

//GetById=> localhost:3000/api/customers/ID
router.get('/:customerId', customerController.getById);

//Put=> localhost:3000/api/produtos/ID
router.put('/:customerId', customerController.put);

//Delete=> localhost:3000/api/produtos/ID
router.delete('/:customerId', customerController.delete);

module.exports = router;