const express = require('express');
const router = express.Router();
const produtctController = require('../controllers/product-controller')
const authService = require('../services/auth-service')

//const mongoose = require('mongoose');

//Rotas para Produto
//Post=> localhost:3000/api/produtos
router.post('/', authService.authorize , produtctController.post);

//GetAll=> localhost:3000/api/produtos
router.get('/', produtctController.getAll);

//GetById=> localhost:3000/api/produtos/ID
router.get('/:productId', produtctController.getById);

//Put=> localhost:3000/api/produtos/ID
router.put('/:productId', produtctController.put);

//Delete=> localhost:3000/api/produtos/ID
router.delete('/:productId', produtctController.delete);

module.exports = router;