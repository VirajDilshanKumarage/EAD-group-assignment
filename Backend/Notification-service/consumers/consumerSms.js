const amqp = require("amqplib");
const twilio = require('twilio');
const { accountSid, authToken, twilioNumber } = require("../env.js");
const logMessage = require('../logger.js');

// Twilio requirements -- Texting API
// const accountSid = 'ACc65b1a8724bc86a708215079b9b8f9a5';
// const authToken = 'a9029fe49672090f344cb04b1fcbe8f7';
const client = new twilio(accountSid, authToken);

class AMQPSMSConnector {
  constructor(amqpServer) {
    this.amqpServer = amqpServer;
  }

  async connector() {
    try {
      return await amqp.connect(this.amqpServer);
    } catch (err) {
      console.error("AMQP server connection error:", err);
      return null;
    }
  }
}

class AMQPChannelSMSCreator {
  constructor(connection) {
    this.connection = connection;
  }

  async createChannel() {
    try {
      return await this.connection.createChannel();
    } catch (err) {
        logMessage.logger("Error creating AMQP channel:", err);
      return null;
    }
  }
}

class AssertSMSQueue {
  constructor(channel) {
    this.channel = channel;
  }

  async assertQueue() {
    try {
      await this.channel.assertQueue("sms-jobs");
    } catch (err) {
        logMessage.logger("Error asserting SMS queue:", err);
    }
  }
}

class ChannelSMSConsumer {
  constructor(channel) {
    this.channel = channel;
  }

  async consume() {
    try {
      this.channel.consume("sms-jobs", async (message) => {
        const smsData = JSON.parse(message.content.toString());
        logMessage.logger(`Received SMS job for recipient ${smsData.recipient}`);

        try {
          // Send SMS using Twilio
          await client.messages.create({
            body: smsData.body,
            to: smsData.recipient,
            from: twilioNumber, // Your Twilio number
          });

          logMessage.logger("SMS sent successfully");
          // Handle successful SMS and database interactions
        } catch (err) {
          logMessage.logger("Error sending SMS:", err);
          // Handle SMS error and database interactions
        }
      });
    } catch (err) {
        logMessage.logger('Error consuming SMS messages:', err);
    }
  }
}

const connectSMS = async () => {
  const AMQPSMSConnectorObject = new AMQPSMSConnector("amqp://localhost:5672");
  const connection = await AMQPSMSConnectorObject.connector();

  if (connection !== null) {
    const AMQPChannelSMSCreatorObject = new AMQPChannelSMSCreator(connection);
    const channel = await AMQPChannelSMSCreatorObject.createChannel();

    if (channel !== null) {
      const AssertSMSQueueObject = new AssertSMSQueue(channel);
      AssertSMSQueueObject.assertQueue();

      const ChannelSMSConsumerObject = new ChannelSMSConsumer(channel);
      await ChannelSMSConsumerObject.consume();
      logMessage.logger("Waiting for SMS messages...");
    }
  }
}

connectSMS();