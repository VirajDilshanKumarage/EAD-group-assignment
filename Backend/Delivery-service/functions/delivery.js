const mongoose = require('mongoose');
const deliveryModel = require('../models/delivery.js');

// const createDelivery = async (data) => {
//     try {

//         const deliveryData = { ...data };

//         const newDelivery = new deliveryModel(deliveryData);
//         const savedDelivery = await newDelivery.save();

//         console.log("Delivery created successfully");
//         return savedDelivery;
//     } catch (err) {
//         // console.error("Failed to create delivery:", err);
//         return {
//             message: "Could Not Create Delivery",
//             error: err.message,
//         };
//     }
// }

const updateDelivery = async (order_id, data) => {
    try {
        const updatedDelivery = await deliveryModel.findOneAndUpdate({ order_id: order_id }, data, { new: true });
        if (!updatedDelivery) {
            throw new Error('Delivery not found');
        }
        return {
            message: 'Successfully Updated',
            data: updatedDelivery // Returning the updated delivery
        };
    } catch (err) {
        return {
            message: 'Could Not Update Delivery',
            error: err.message,
        };
    }
};



const getAllDelivery = async () => {

    console.log('getting deliveries');
    try {
        const deliveries = await deliveryModel.find();

        return deliveries;
    } catch (error) {
        return {
            message: "Could Not Get Deliveries",
            error: error.message,
        };
    }
}


const getDeliveryBy = async (params) => {
    console.log('getting filtered deliveries');
    try {
        const deliveries = await deliveryModel.find(params);

        return deliveries;
    } catch (error) {
        return {
            message: "Could Not Get Filtered Deliveries",
            error: error.message,
        };
    }
}


// Endpoint to receive order modification request from the other server
    const getOrderDetails = async (req,res) => {
    const orderDetails = req.body.orderDetails;
    console.log('Received order modification request:', orderDetails);
  
    try {
      // Create a new order document in the database
      const newOrder = new Order({
        orderId: orderDetails.orderId,
        customerName: orderDetails.customerName,
        address: orderDetails.address,
        items: orderDetails.items,
      });
  
      await newOrder.save();
      res.status(200).send({ message: 'Order modified successfully' });
    } catch (error) {
      console.error('Error saving order to database:', error.message);
      res.status(500).send({ error: error.message });
    }
  };
  

  const modifyOrder = async (orderDetails) => {
    console.log('Received order modification request:', orderDetails);

    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 30);
  
    try {
      const newDelivery = new deliveryModel({
        customer_id: orderDetails.customer_id,
        customer_name: orderDetails.customerName,
        items: orderDetails.items,
        date: orderDetails.date,
        address: orderDetails.address,
        status: orderDetails.status,
        order_id: orderDetails.order_id,
        estimated_date: orderDetails.estimated_date,
      });
  
      await newDelivery.save();
      return { message: 'Delivery modified successfully' };
    } catch (error) {
      console.error('Error saving delivery to database:', error.message);
      return { error: error.message };
    }
  };

  const deleteDelivery = async (order_id) => {
    try {
        const deletedDelivery = await deliveryModel.findOneAndDelete({ order_id: order_id });
        if (!deletedDelivery) {
            throw new Error('Delivery not found');
        }
        return { message: 'Delivery deleted successfully' };
    } catch (error) {
        return {
            message: 'Could Not Delete Delivery',
            error: error.message,
        };
    }
};

module.exports = {
    updateDelivery,
    getAllDelivery,
    getDeliveryBy,
    getOrderDetails,
    modifyOrder,
    deleteDelivery,
  };