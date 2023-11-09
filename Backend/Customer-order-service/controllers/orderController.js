const Order = require('../models/order');
const deliveryService = require('../services/deliveryService');
const inventoryService = require('../services/inventoryService');

const sendModifyOrderToDelivery = deliveryService.sendModifyOrderToDelivery;
const sendCancelOrderToInventory = inventoryService.sendCancelOrderToInventory;

class OrderController {
  getOrdersByCustomerID = async (req, res) => {
    const customerID = req.body.cid;
    let order;
    try {
      order = await Order.findOne({ customerID: customerID });
    } catch (err) {
      console.error(err);
      // Handle the error appropriately
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // Check if an order was found
    if (!order) {
      // Handle case where no order was found for the given customerID
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ order: order.toObject({ getters: true }) });
  };

  deleteOrderByCustomerID = async (req, res) => {
    const orderID = req.body.orderID;

    try {
      // Find and delete the order
      const deletedOrder = await Order.findOneAndDelete({
        _id: orderID,
      });
      // Check if an order was found and deleted
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({
        message: 'Order deleted successfully',
        deletedOrder: deletedOrder.toObject({ getters: true }),
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  createOrderForCustomer = async (req, res) => {
    const customerId = req.body.customerId;
    const items = req.body.items;
    const status = req.body.status;
    const deliveryAddress = req.body.deliveryAddress;
    const orderDate = req.body.orderDate;

    try {
      const newOrder = new Order({
        customerId: customerId,
        items: items,
        status: status,
        deliveryAddress: deliveryAddress,
        orderDate: orderDate,
      });

      // Save the new order to the database
      const savedOrder = await newOrder.save();

      res.status(201).json({
        message: 'Order created successfully',
        order: savedOrder.toObject({ getters: true }),
      });
    } catch (err) {
      console.error(err);
      // Handle the error appropriately, maybe send an error response
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // can edit only the delivery address
  editOrderByCustomerID = async (req, res) => {
    const orderID = req.body.orderID;
    const deliveryAddress = req.body.deliveryAddress;

    try {
      // Find the order by ID and update its properties
      const updatedOrder = await Order.findByIdAndUpdate(
        orderID,
        { deliveryAddress: deliveryAddress },
        { new: true }
      );

      // Check if an order was found and updated
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Send AddressModified event to the inventory service
      await sendModifyOrderToDelivery(updatedOrder);

      res.json({
        message: 'Order updated successfully',
        order: updatedOrder.toObject({ getters: true }),
      });
    } catch (err) {
      console.error(err);
      // Handle the error appropriately, maybe send an error response
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  cancelOrder = async (req, res) => {
    const orderID = req.body.orderID;
    const status = req.body.status;

    try {
      // Find the order by ID and update its properties
      const updatedOrder = await Order.findByIdAndUpdate(
        orderID,
        { status: status },
        { new: true }
      );

      // Check if an order was found and updated
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Send OrderCanceled event to the inventory service
      await sendCancelOrderToInventory(updatedOrder);

      res.json({
        message: 'Order canceled successfully',
        order: updatedOrder.toObject({ getters: true }),
      });
    } catch (err) {
      console.error(err);
      // Handle the error appropriately, maybe send an error response
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

module.exports = OrderController;
