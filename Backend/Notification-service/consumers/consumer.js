const amqp = require("amqplib");
const { EMAIL, PASSWORD } = require("../env.js");
const MailGen = require("mailgen");
const nodeMailer = require("nodemailer");
const mongoose = require('mongoose');

class Database {
  constructor(dbUrl) {
    this.dbUrl = dbUrl;
    this.connection = null;
  }

  static getInstance(dbUrl) {
    if (!this.instance) {
      this.instance = new Database(dbUrl);
    }
    return this.instance;
  }

  async connect() {
    if (!this.connection) {
      this.connection = await mongoose.connect(this.dbUrl);
      console.log('DB connected');
    }
    return this.connection;
  }
}

const DB_URL = 'mongodb+srv://chandulakavishka0:ecomEAD@cluster0.bcd7kuy.mongodb.net/';
const dbInstance = Database.getInstance(DB_URL);
dbInstance.connect();

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

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");

    channel.consume("jobs", async (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received job with input ${input.email}`);

      try {
        const emailMessage = EmailFactory.createEmail(input, mailGenerator, EMAIL);

        transporter.sendMail(emailMessage, async (err) => {
          if (err) {
            console.log(`Error sending Message ${err}`);
            // Handle email error and database interactions
          } else {
            console.log("Email sent successfully");
            // Handle successful email and database interactions
          }
        });
      } catch (err) {
        console.log("Error:", err);
      }
    });
    console.log("Waiting for messages...");
  } catch (ex) {
    console.error(ex);
  }
}

const mailGenerator = new MailGen({
  theme: "salted",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

connect();
