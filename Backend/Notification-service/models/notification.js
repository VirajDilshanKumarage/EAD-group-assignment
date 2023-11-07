const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    notificationId: {
        type: Number, // Use Number type for integers
        required: true
    },
    email: {
        type: String, // Keep email as a string
        required: true
    },
    sendError: {
        type: Number, // Use Number type for integers
        required: true
    }
});

const Notification = mongoose.model('Notification',postSchema);
module.exports =  Notification;

//module.exports = mongoose.model('Notification',postSchema);