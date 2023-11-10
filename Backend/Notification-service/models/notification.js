const mongoose = require('mongoose');

class NotificationModel {
  constructor() {
    this.Notification = mongoose.model('Notification', this.getSchema());
  }

  getSchema() {
    const postSchema = new mongoose.Schema({
      notificationId: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      sendError: {
        type: Number,
        required: true,
      },
    });

    return postSchema;
  }

  getModel() {
    return this.Notification;
  }
}

const notificationModel = new NotificationModel();

module.exports = notificationModel.getModel();
