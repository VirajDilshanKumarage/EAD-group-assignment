const CartItem = require('../models/cartItems');

// Get cart items for a customer
exports.getCartItems = async (req, res) => {
    const { customerId } = req.params;
  
    try {
      const cartItems = await CartItem.find({ customerId });
  
      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving cart items' });
    }
  };

  // save items
exports.addToCart = async (req, res) => {
  const { customerId, productId, quantity, price } = req.body;

  try {
    // Check if the item is already in the cart
    let cartItem = await CartItem.findOne({ customerId, productId });

    if (cartItem) {
      // If it exists, update the quantity
      cartItem.quantity += quantity;
    } else {
      // If not, create a new cart item
      cartItem = new CartItem({
        customerId,
        productId,
        quantity,
        price,
      });
    }

    // Save the cart item
    await cartItem.save();

    res.status(200).json({ message: 'Item added to the cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
  }
};

// update the quantity of a specific cart item
exports.updateCartItemQuantity = async (req, res) => {
    const { customerId, productId } = req.params;
    const { quantity } = req.body;
  
    try {
      const cartItem = await CartItem.findOne({ customerId, productId });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      cartItem.quantity = quantity;
  
      await cartItem.save();
  
      res.status(200).json({ message: 'Cart item quantity updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating cart item quantity' });
    }
  };
  
  // delete a specific cart item
  exports.deleteCartItem = async (req, res) => {
    const { customerId, productId } = req.params;
  
    try {
      const result = await CartItem.findOneAndDelete({ customerId, productId });
  
      if (result) {
        res.status(200).json({ message: 'Cart item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Cart item not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting cart item' });
    }
  };
  
