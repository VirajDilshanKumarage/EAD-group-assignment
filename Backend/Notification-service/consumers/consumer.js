const amqp = require("amqplib");
const { EMAIL, PASSWORD } = require("../env.js");
const MailGen = require("mailgen");
const nodeMailer = require("nodemailer");
const databaseConnection = require('../databaseConnection.js');
const logMessage = require('../logger.js');
const findDocment = require('../DB_Workers/documentFinder.js');
const deleteDocument = require('../DB_Workers/documentRemover.js');
const updateDocument = require('../DB_Workers/documentUpdater.js');
const notification = require('../models/notification.js');


const DB_URL = 'mongodb+srv://chandulakavishka0:ecomEAD@cluster0.bcd7kuy.mongodb.net/';
//make the database connection
// class Database {
//   constructor(DB_URL) {
//     this.DB_URL = DB_URL
//   }

//   makeConnection() {
//     databaseConnection.db_connection(this.DB_URL)
//   }

// }

// const db = new Database(DB_URL);
// db.makeConnection();

const dbInstance = new databaseConnection.Database;
dbInstance.setUrl(DB_URL);
dbInstance.connect();

<<<<<<< HEAD

=======
>>>>>>> parent of fc74573 (attached orderDetails into email)
class EmailFactory {
  static createEmail(input, mailGenerator, EMAIL) {
    const response = {
      body: {
        title: 'Welcome to EcomEAD!',
        name: 'Dear Sir/Madam',
        intro: 'Your order is being processed, and you will receive an email once it\'s on its way. If you have any questions or need assistance, please don\'t hesitate to contact our support team at ecomeadinfo@gmail.com.',
        outro: 'Thank you for choosing EcomEAD!',
      },
    };

    const mail = mailGenerator.generate(response);

    return {
      from: EMAIL,
      to: input.email,
      subject: 'Order Confirmation!',
      html: mail,
    };
  }
}

class Transpoter {

  constructor() {
    this.transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
  }

}

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

let notificationIdCounter = 1;

class ChannelConsumer {
  constructor(channel) {
    this.channel = channel
  }

  async consume() {
    try {
      this.channel.consume("jobs", async (message) => {
        const input = JSON.parse(message.content.toString());
        logMessage.logger(`Received job with input ${input.email}`)

        try {
          const emailMessage = EmailFactory.createEmail(input, mailGenerator, EMAIL);
          const transporterObject = new Transpoter();

          transporterObject.transporter.sendMail(emailMessage, async (err) => {
            if (err) {
              console.log(`Error sending Message ${err}`);
              // Handle email error and database interactions
              const email = input.email;
              try {
                // Check if a document with the email exists in the database
                const existingDocument = await findDocment.findDocment(email);

                if (existingDocument) {
                  // If it exists, update the sendError field by incrementing it by 1
                  existingDocument.sendError += 1;

                  if (existingDocument.sendError >= 3) {
                    // If sendError reaches 3 or more, delete the document
                    deleteDocument.deleteDocument(email);
                    console.log("Document deleted due to sendError reaching 3 or more.");
                    return this.channel.ack(message);
                  } else {
                    // Save the updated document
                    updateDocument.updateDocument(existingDocument);
                    console.log("sendError updated successfully");
                    return this.channel.nack(message);

                  }

                } else {
                  // If it doesn't exist, create a new document with auto-incremented notificationId
                  const newPost = new notification({
                    email,
                    sendError: 0,
                    notificationId: notificationIdCounter++,
                  });
                  updateDocument.updateDocument(newPost);
                  console.log("New document created successfully");
                  return this.channel.nack(message);
                }

              } catch (err) {
                console.log("Error", err);
                return;
              }

            } else {
              console.log("Email sent successfully");
              this.channel.ack(message);
              const checkDocument = await findDocment.findDocment(input.email);
              if (checkDocument) {
                deleteDocument.deleteDocument(input.email);
                logMessage.logger("Email successfully sent. Document has been deleted from the DB");
              } else {
                logMessage.logger("Email successfully sent. Document is not available in the DB");
              }
            }
          });
        } catch (err) {
          logMessage.logger("ERROR creating email", err)
        }
      })
    } catch (err) {
      logMessage.logger('ERROR consuming messages', err);
    }

  }

}

const connect = async () => {
  const AMQPServerConnectorObject = new AMQPServerConnector("amqp://localhost:5672");
  const connection = await AMQPServerConnectorObject.connector();
  //console.log('elephant',connection);
  if (connection !== null) {
    const AMQPChannelCreatorObject = new AMQPChannelCreator(connection);
    const channel = await AMQPChannelCreatorObject.createChannel();
    if (channel !== null) {
      const AssertQueueObject = new AssertQueue(channel);
      AssertQueueObject.assertQueue();

      const ChannelConsumerObject = new ChannelConsumer(channel);
      await ChannelConsumerObject.consume();
      logMessage.logger("waiting for messages...")
    }
  }
}
connect();

const mailGenerator = new MailGen({
  theme: "salted",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

// connect();
