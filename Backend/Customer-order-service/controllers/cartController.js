const CartItem = require('../models/cartItems');
const InventoryService = require('../services/InventoryManagerService');

// --------------Function to get cart items for a specific customer------------------
exports.getCartItems = async (req, res) => {
  const { customerId } = req.params;

  try {
    const cartItems = await CartItem.find({ customerId });

    let totalPrice = 0; // Initialize the total price
    let totalProducts = 0; // Initialize the total number of products
    let productsWithTotalPrice = []; // Initialize an array to store products with total prices

    for (const cartItem of cartItems) {
      // Calculate the price for each cart item  
      const itemPrice = cartItem.price * cartItem.quantity;
      //calculate the total price
      totalPrice += itemPrice;

      // Add the quantity of each cart item to the total number of products
      totalProducts += cartItem.quantity;

      // Create an object for the product with its total price
      const productWithTotalPrice = {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: cartItem.price,
        totalItemPrice: itemPrice,
      };

      productsWithTotalPrice.push(productWithTotalPrice);
    }

    res.status(200).json({
      cartItems: productsWithTotalPrice, // added total price for each one
      totalPrice,
      totalProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving cart items' });
  }
};

// ----------Function to add an item to the cart---------------
exports.addToCart = async (req, res) => {
  const { customerId, productId, quantity, price } = req.body;

  try {
    const isAvailable = await InventoryService.isProductAvailable(productId, quantity);

    if (isAvailable) {
      // If the product is available, add it to the cart and update the inventory
      const cartItem = await CartItem.findOne({ customerId, productId });

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cartItem = new CartItem({
          customerId,
          productId,
          quantity,
          price,
        });
      }

      await cartItem.save();
      // await InventoryService.updateInventoryOnAdd(productId, quantity);

      res.status(200).json({ message: 'Item added to the cart successfully' });
    } else {
      res.status(400).json({ error: 'Product is not available in the inventory' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
  }
};

// ---------Function to update the quantity of a specific cart item for a specific customer----------------
exports.updateCartItemQuantity = async (req, res) => {
  const { customerId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await CartItem.findOne({ customerId, productId });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    const previousQuantity = cartItem.quantity;
    cartItem.quantity = quantity;

    await cartItem.save();

    // await InventoryService.updateInventoryOnUpdateOrDelete(productId, previousQuantity, quantity);

    res.status(200).json({ message: 'Cart item quantity updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating cart item quantity' });
  }
};

//--------Function to delete a specific cart item for a specific customer--------------
exports.deleteCartItem = async (req, res) => {
  const { customerId, productId } = req.params;

  try {
    const cartItem = await CartItem.findOne({ customerId, productId });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // const previousQuantity = cartItem.quantity;

    await cartItem.remove();

    // await InventoryService.updateInventoryOnUpdateOrDelete(productId, previousQuantity, 0);

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting cart item' });
  }
};

// --------Function to delete a specific cart item for a specific customer--------------
exports.deleteCartItem = async (req, res) => {
  const { customerId, productId } = req.params;

  try {
    const cartItem = await CartItem.findOne({ customerId, productId });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // const previousQuantity = cartItem.quantity;

    await cartItem.deleteOne();

    // await InventoryService.updateInventoryOnUpdateOrDelete(productId, previousQuantity, 0);

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting cart item' });
  }
};

