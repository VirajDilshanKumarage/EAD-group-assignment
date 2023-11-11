const axios = require('axios');

const sendOrderConfirmationToNotification = async (order) => {
  const notificationServiceUrl = 'http://localhost:5011/orderConfimation';
  const confirmedOrder = {
    orderDetails: order,
  };

  try {
    const response = await axios.post(notificationServiceUrl, confirmedOrder);
    console.log('Notification service response:', response.data);
  } catch (error) {
    console.error(
      'Error sending confirm order to notification service:',
      error.message
    );
    throw new Error('Cannot send the message to notification service');
  }
};

exports.sendOrderConfirmationToNotification =
  sendOrderConfirmationToNotification;
