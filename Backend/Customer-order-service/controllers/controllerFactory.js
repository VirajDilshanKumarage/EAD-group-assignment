// Factory pattern for creating controllers
const CartController = require('./cartController');
const OrderController = require('./orderController');

class ControllerFactory {
  createCartController() {
    return new CartController();
  }

  createOrderController() {
    return new OrderController();
  }
}

module.exports = new ControllerFactory();
