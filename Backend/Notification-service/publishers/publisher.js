/* RabbitMQ */
const amqp = require("amqplib");
const logMessage = require('../logger');

class AMQPServerConnector {

    constructor(amqpServer) {
        this.amqpServer = amqpServer;
    }
    async connector() {
        console.log('parrot', this.amqpServer);
        try {
            return await amqp.connect(this.amqpServer);
        } catch (err) {
            logMessage.logger("AMQP server connection error : ", err);
            return null;
        }
    }
}

class AMQPChannelCreator {

    constructor(connection) {
        this.connection = connection;
    }

    async createChannel() {
        try {
            return await this.connection.createChannel();
        } catch (err) {
            logMessage.logger("ERROR creating AMQP channel", err);
            return null;
        }
    }
}

class AssertQueue {
    constructor(channel) {
        this.channel = channel;
    }

    async assertQueue() {
        try {
            await this.channel.assertQueue("jobs");
        } catch (err) {
            logMessage.logger("ERROR asserting queue", err)
        }
    }
}

class SendQueue {
    constructor(channel,emailBody) {
        this.channel = channel,
        this.emailBody = emailBody
    }

    async sendQueue() {
        console.log('hava',this.emailBody);
        try {
            await this.channel.sendToQueue("jobs", Buffer.from(JSON.stringify(this.emailBody)));
            logMessage.logger(`Job sent successfully ${this.emailBody.email}`)
        } catch (err) {
            logMessage.logger("ERROR sending queue", err)
        }
    }
}

class ChannelTerminator {
    constructor(channel) {
        this.channel = channel;
    }

    async channelTerminator() {
        await this.channel.close();
    }
}

class ConnectionTerminator {
    constructor(connection) {
        this.connection = connection;
    }

    async connectionTerminator() {
        await this.connection.close();
    }
}

const connect = async (req, res) => {
    const emailBody = req.body;

    const AMQPServerConnectorObject = new AMQPServerConnector("amqp://localhost:5672");
    const connection = await AMQPServerConnectorObject.connector();
    //console.log('elephant',connection);
    if (connection !== null) {
        const AMQPChannelCreatorObject = new AMQPChannelCreator(connection);
        const channel = await AMQPChannelCreatorObject.createChannel();
        if (channel !== null) {
            const AssertQueueObject = new AssertQueue(channel);
            const SendQueueObject = new SendQueue(channel,emailBody);
            await AssertQueueObject.assertQueue();
            await SendQueueObject.sendQueue();

            const ChannelTerminatorObject = new ChannelTerminator(channel);
            await ChannelTerminatorObject.channelTerminator()

            res.status(200).json({ message: 'published the notification successfully' });
        }else{
            res.status(500).json({ message: 'published the notification failed' });
        }

        const ConnectionTerminatorObject = new ConnectionTerminator(connection);
        ConnectionTerminatorObject.connectionTerminator();

    }else{
        res.status(500).json({ message: 'published the notification failed' });
    }
}


// const connect2 = async (req, res, next) => {

//     const emailBody = req.body;

//     try {
//         const amqpServer = "amqp://localhost:5672"
//         const connection = await amqp.connect(amqpServer)
//         const channel = await connection.createChannel();
//         await channel.assertQueue("jobs");
//         await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(emailBody)));
//         console.log(`Job sent successfully ${emailBody.email}`);
//         await channel.close();
//         await connection.close();
//         res.status(200).json({ message: 'published the notification successfully' });
//     }
//     catch (ex){
//         console.error(ex);
//         res.status(500).json({ message: 'published the notification failed' });
//     }
// }


exports.connect = connect;