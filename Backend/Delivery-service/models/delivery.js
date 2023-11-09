// models/delivery.js

const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  customer_id: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
     required: true,
  },
  items: {
    type: [String],
     required: true,
  },
  date: {
    type: Date,
    // required: true,
  },
  address: {
    type: String,
     required: true,
  },
  status: {
    type: String,
     required: true,
  },
  order_id: {
    type: String,
     required: true,
  },
  estimated_date: {
    type: Date,
    default: function () {
      const today = new Date();
      const estimatedDate = new Date(today.setDate(today.getDate() + 30));
      return estimatedDate;
    },
  },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
