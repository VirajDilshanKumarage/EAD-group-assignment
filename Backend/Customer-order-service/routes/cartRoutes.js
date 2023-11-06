const express = require('express');
const router = express.Router();
const controllerFactory = require('../controllers/controllerFactory');

const cartController = controllerFactory.createCartController(); // Use the factory

// Get cart items for a customer
router.get('/get-cart-items/:customerId', cartController.getCartItems);

// Add an item to the cart
router.post('/add-to-cart', cartController.addToCart);

// Update quantity of a specific cart item for a specific customer
router.put('/update-cart-item/:customerId/:productId', cartController.updateCartItemQuantity);

// Delete a specific cart item
router.delete('/delete-cart-item/:customerId/:productId', cartController.deleteCartItem);

module.exports = router;
