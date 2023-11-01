const Order = require('../../models/settings-models/command');
const sendCancelOrderToInventory = require('../services/deliveryService');
const sendModifyOrderToDelivery = require('../services/deliveryService');

const getOrdersByCustomerID = async (req, res, next) => {
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

const deleteOrderByCustomerID = async (req, res, next) => {
  const customerID = req.body.customerID;
  const orderID = req.body.orderID;

  try {
    // Find and delete the order
    const deletedOrder = await Order.findOneAndDelete({
      customerID: customerID,
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

const createOrderForCustomer = async (req, res, next) => {
  const customerID = req.body.customerID;
  const itemDetails = req.body.itemDetails;
  const status = req.body.status;
  const deliveryAddress = req.body.deliveryAddress;
  const date = req.body.date;

  try {
    const newOrder = new Order({
      customerID: customerID,
      itemDetails: itemDetails,
      status: status,
      deliveryAddress: deliveryAddress,
      date: date,
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
const editOrderByCustomerID = async (req, res, next) => {
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

    // Send AddressModified event to the message broker
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

const cancelOrder = async (req, res, next) => {
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

    // Send OrderCanceled event to the message broker
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

exports.getOrdersByCustomerID = getOrdersByCustomerID;
exports.deleteOrderByCustomerID = deleteOrderByCustomerID;
exports.createOrderForCustomer = createOrderForCustomer;
exports.editOrderByCustomerID = editOrderByCustomerID;
exports.cancelOrder = cancelOrder;
