const axios = require('axios');

const sendModifyOrderToDelivery = async (order) => {
  const deliveryServiceUrl = 'http://delivery-service/api/modifyAddress';
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
  }
};

exports.sendModifyOrderToDelivery = sendModifyOrderToDelivery;
