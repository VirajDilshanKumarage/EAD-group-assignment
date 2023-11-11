const axios = require('axios');

const sendModifyOrderToDelivery = async (order) => {
  const deliveryServiceUrl = 'http://localhost:8888/delivaryAdrress';
  const modifiedOrder = {
    orderDetails: order,
  };

  try {
    const response = await axios.post(deliveryServiceUrl, modifiedOrder);
    console.log('Delivery service response:', response.data);
  } catch (error) {
    console.error(
      'Error sending modify order to delivery service:',
      error.message
    );
    throw new Error('Cannot send the message to deliver service');
  }
};

exports.sendModifyOrderToDelivery = sendModifyOrderToDelivery;
