const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  productName:{
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
