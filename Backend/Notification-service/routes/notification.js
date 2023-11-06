const express = require('express');
const notification = require('../models/notification');

const router = express.Router();

//let notificationIdCounter = 1; // Initialize the counter
const failedEmailHandler = require("../controller/notificationController");

// Save, update, or delete notification
router.post('/post/save',failedEmailHandler.failedMailHandler)
module.exports = router;
