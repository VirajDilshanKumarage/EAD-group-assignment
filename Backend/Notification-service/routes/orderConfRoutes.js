const express = require('express');
const router = express.Router();

const orderConfNotifyController = require("../publishers/publisher");
const xys=require("../mailSender");
//router.get('/myEcom/orderComfNotify', xys.mailHandler);
router.get('/myEcom/orderComfNotify', orderConfNotifyController.connect);

module.exports = router;