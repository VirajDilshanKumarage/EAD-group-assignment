// Factory pattern for creating controllers
const CartController = require('./cartController');

class ControllerFactory {
  createCartController() {
    return new CartController();
  }
}

module.exports = new ControllerFactory();
