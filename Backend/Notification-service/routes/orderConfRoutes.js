const express = require('express');
const router = express.Router();

const orderConfNotifyController = require("../publishers/publisher");

router.post('/ecomEAD/orderComfNotify', orderConfNotifyController.connect);

module.exports = router;