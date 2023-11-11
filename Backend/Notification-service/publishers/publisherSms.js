/* RabbitMQ */
const amqp = require("amqplib");
const express = require('express');
const bodyParser = require('body-parser');
const logMessage = require('../logger');

const app = express();
app.use(bodyParser.json());

class SMSQueuePublisher {
    constructor(amqpServer) {
        this.amqpServer = amqpServer;
    }

    async connect() {
        try {
            return await amqp.connect(this.amqpServer);
        } catch (err) {
            logMessage.logger("AMQP server connection error : ", err);
            return null;
        }
    }

    async createChannel(connection) {
        try {
            return await connection.createChannel();
        } catch (err) {
            logMessage.logger("ERROR creating AMQP channel", err);
            return null;
        }
    }

    async assertQueue(channel) {
        try {
            await channel.assertQueue("sms-jobs");
        } catch (err) {
            logMessage.logger("ERROR asserting queue", err);
        }
    }

    async sendSMS(channel, recipient) {
        try {
            const smsData = {
                recipient: recipient,
                body: 'Your order is being processed, and you will receive an email once it\'s on its way. If you have any questions or need assistance, please don\'t hesitate to contact our support team at 0789987225.',
            };

            await channel.sendToQueue("sms-jobs", Buffer.from(JSON.stringify(smsData)));
            logMessage.logger(`SMS job sent successfully for recipient ${recipient}`);
        } catch (err) {
            logMessage.logger("ERROR sending SMS", err);
        }
    }

    async closeChannel(channel) {
        await channel.close();
    }

    async closeConnection(connection) {
        await connection.close();
    }
}

const publishSMS = async (req, res) => {
    const { recipient } = req.body;
    const amqpServer = "amqp://localhost:5672";

    const smsQueuePublisher = new SMSQueuePublisher(amqpServer);
    const connection = await smsQueuePublisher.connect();

    if (connection !== null) {
        const channel = await smsQueuePublisher.createChannel(connection);

        if (channel !== null) {
            await smsQueuePublisher.assertQueue(channel);
            await smsQueuePublisher.sendSMS(channel, recipient);
            await smsQueuePublisher.closeChannel(channel);

            res.status(200).json({ message: 'SMS job received successfully' });
        } else {
            res.status(500).json({ message: 'Failed to create AMQP channel for SMS' });
        }

        await smsQueuePublisher.closeConnection(connection);
    } else {
        res.status(500).json({ message: 'Failed to connect to AMQP server for SMS' });
    }
};

// Endpoint to receive SMS data from Postman
app.post('/send-sms', publishSMS);

const PORT = 5010; // Adjust the port as needed
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
