const express = require('express');
const router = express.Router();

const orderConfNotifyController = require('../publishers/publisher');

class OrderConfNotifyRouter {
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    router.post('/ecomEAD/orderComfNotify', orderConfNotifyController.connect);
  }

  getRouter() {
    return router;
  }
}

const orderConfNotifyRouter = new OrderConfNotifyRouter();

module.exports = orderConfNotifyRouter.getRouter();
