const mongoose = require('mongoose');
const deliveryModel = require('../models/delivery.js');



const updateDelivery = async (order_id, data) => {
    try {
        const updatedDelivery = await deliveryModel.findOneAndUpdate(
            { order_id: order_id },
            data,
            { new: true }
        );

        if (!updatedDelivery) {
            return {
                message: 'Delivery not found for order_id: ' + order_id,
                error: 'Delivery not found',
                status: 404, // HTTP 404 Not Found status code
            };
        }

        return {
            message: 'Successfully Updated',
            data: updatedDelivery // Returning the updated delivery
        };
    } catch (err) {
        return {
            message: 'Could Not Update Delivery',
            error: err.message,
            status: 500, // HTTP 500 Internal Server Error status code
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
    console.log('Params:', params); // Add this line to log the received parameters

    try {
        const deliveries = await deliveryModel.find(params).exec();
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
        orderId: orderDetails._id,
        customer_id: orderDetails.customerId,
        customerName: orderDetails.customerName,
        address: orderDetails.deliveryAddress,
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
            customer_id: orderDetails.customerId,
            items: orderDetails.items,
            date: orderDetails.orderdate,
            address: orderDetails.deliveryAddress,
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