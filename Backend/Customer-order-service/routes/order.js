const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/order-controllers');

// Create a order
router.post('/:customerId/checkout', orderControllers.createOrderForCustomer);

module.exports = router;
