const express = require('express');
const router = express.Router();
const controllerFactory = require('../controllers/controllerFactory');

const orderController = controllerFactory.createOrderController();
// Create a order
router.post('/:customerId/checkout', orderController.createOrderForCustomer);
// Cancel a order
router.put('/:customerId/cancel', orderController.cancelOrder);
// Change the shipping address of a order
router.put(
  '/:customerId/:orderId/modifyAddress',
  orderController.editOrderByCustomerID
);
// get all the orders by customerId
router.get('/:customerId/orders', orderController.getOrdersByCustomerID);
// delete order
router.delete('/:customerId/:orderId', orderController.deleteOrderByCustomerID);

module.exports = router;
