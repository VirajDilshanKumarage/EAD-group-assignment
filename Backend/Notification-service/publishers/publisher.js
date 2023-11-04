/* RabbitMQ */
const amqp = require("amqplib");

const msg = {email:"isurugamageinfo@gmail.com"}
//const msg = {email:"isurumadushangamage99@gmail.com"}
//connect();

const connect = async (req, res, next) => {
    try {
        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
        console.log(`Job sent successfully ${msg.number}`);
        await channel.close();
        await connection.close();
        res.status(200).json({ message: 'published the notification successfully' });
    }
    catch (ex){
        console.error(ex);
        res.status(500).json({ message: 'published the notification failed' });
    }
}



exports.connect = connect;