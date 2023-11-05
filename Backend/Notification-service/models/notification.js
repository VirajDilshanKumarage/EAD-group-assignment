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


module.exports = mongoose.model('Notification',postSchema);