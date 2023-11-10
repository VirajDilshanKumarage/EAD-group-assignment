const CartItem = require('../models/cartItems');

class CartController {
  // Function to get cart items for a specific customer(Single Responsibility Principle)
  async getCartItems(req, res) {
    const { customerId } = req.params;

    try {
      const cartItems = await CartItem.find({ customerId });

      // Calculate total price, total products, and format cart items
      let totalPrice = 0;
      let totalProducts = 0;
      let productsWithTotalPrice = [];

      for (const cartItem of cartItems) {
        const itemPrice = cartItem.price * cartItem.quantity;
        totalPrice += itemPrice;
        totalProducts += cartItem.quantity;

        const productWithTotalPrice = {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: cartItem.price,
          totalItemPrice: itemPrice,
        };

        productsWithTotalPrice.push(productWithTotalPrice);
      }

      res.status(200).json({
        cartItems: productsWithTotalPrice,
        totalPrice,
        totalProducts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving cart items' });
    }
  }

  // Function to add an item to the cart
  async addToCart(req, res) {
    const { customerId, productId, quantity, price,productName } = req.body;

    try {
      let cartItem = await CartItem.findOne({ customerId, productId });

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cartItem = new CartItem({
          customerId,
          productId,
          quantity,
          price,
          productName
        });
      }

      await cartItem.save();

      res.status(200).json({ message: 'Item added to the cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
    }
  }

  // Function to update the quantity of a specific cart item for a specific customer
  async updateCartItemQuantity(req, res) {
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
  }

  // Function to delete a specific cart item for a specific customer
  async deleteCartItem(req, res) {
    const { customerId, productId } = req.params;

    try {
      const cartItem = await CartItem.findOne({ customerId, productId });

      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }

      await cartItem.deleteOne();

      res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting cart item' });
    }
  }
}

module.exports = CartController;
