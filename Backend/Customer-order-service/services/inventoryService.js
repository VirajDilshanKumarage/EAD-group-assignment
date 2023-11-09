const axios = require('axios');

const sendCancelOrderToInventory = async (order) => {
  const inventoryServiceUrl = 'http://inventory-service/api/cancelOrder';
  const canceledOrder = {
    orderDetails: order,
  };

  try {
    const response = await axios.post(inventoryServiceUrl, canceledOrder);
    console.log('Inventory service response:', response.data);
  } catch (error) {
    console.error(
      'Error sending cancel order to inventory service:',
      error.message
    );
    throw new Error('Cannot send the message to inventory service');
  }
};

exports.sendCancelOrderToInventory = sendCancelOrderToInventory;
