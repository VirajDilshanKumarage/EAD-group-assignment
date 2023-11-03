const express = require('express');
const router = express.Router();

const orderConfNotifyController = require("../publishers/publisher");
router.get('/myEcom/orderComfNotify', orderConfNotifyController.connect);

module.exports = router;