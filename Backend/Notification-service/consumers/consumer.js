const amqp = require("amqplib");
const { mailHandler } = require("../mailSender.js");
const { EMAIL, PASSWORD } = require("../env.js");
const MailGen = require("mailgen");
const nodeMailer = require("nodemailer");
const notification = require('../models/notification.js');
const mongoose = require('mongoose');
const {Worker} = require("node:worker_threads");
//require('./workerForHandlingDB.js')

const DB_URL = 'mongodb+srv://chandulakavishka0:ecomEAD@cluster0.bcd7kuy.mongodb.net/'

mongoose.connect(DB_URL,)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => console.log('DB connection error', err));

let config = {
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
};

let transporter = nodeMailer.createTransport(config);

let mailGenerator = new MailGen({
  theme: "salted",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

let response = {
  body: {
    title: "Welcome to EcomEAD!",
    name: "Dear Sir/Madam",
    intro:
      "Your order is being processed, and you will receive an email once it's on its way. If you have any questions or need assistance, please don't hesitate to contact our support team at ecomeadinfo@gmail.com.",
    outro: "Thank you for choosing EcomEAD!",
  },
};

let mail = mailGenerator.generate(response);
let notificationIdCounter = 1; // Initialize the counter

connect();
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    channel.consume("jobs", async (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Recieved job with input ${input.email}`);
      console.log("hava9");

      try {
        let emailMessage = {
          from: EMAIL,
          to: input.email,
          subject: "Order Confirmation!",
          html: mail,
        };

        transporter.sendMail(emailMessage, async (err, info) => {
          if (err) {
            console.log(`Error sending Message ${err}`);
            const email = input.email;
            try {
              console.log('butterfly', email);
              // Check if a document with the email exists in the database
              const existingDocument = await notification.findOne({ email });

              if (existingDocument) {
                // If it exists, update the sendError field by incrementing it by 1
                existingDocument.sendError += 1;

                if (existingDocument.sendError >= 3) {
                  // If sendError reaches 3 or more, delete the document
                  await notification.deleteOne({ email });
                  console.log("Document deleted due to sendError reaching 3 or more.");
                  return channel.ack(message);
                } else {
                  // Save the updated document
                  await existingDocument.save();
                  console.log("sendError updated successfully");
                  return channel.nack(message);

                }

              } else {
                // If it doesn't exist, create a new document with auto-incremented notificationId
                const newPost = new notification({
                  email,
                  sendError: 0,
                  notificationId: notificationIdCounter++,
                });
                await newPost.save();
                console.log("New document created successfully");
                return channel.nack(message);
              }

            } catch (err) {
              console.log("Error", err);
              return;
            }

          } else {
            console.log("Email sent successfully");
            channel.ack(message);

            const worker = new worker('./workerForHandlingDB.js',{
              email:input.email
            });

            worker.on('message',(message)=>{
              console.log(message);
            })
            // try {
            //   // Check if a document with the email exists in the database
            //   const existingDocument = await notification.findOne({ email: input.email });
            //   if (existingDocument) {
            //     await notification.deleteOne({ email:input.email });
            //     console.log("Email successfully sent. Document has been deleted from the");
            //   }

            // } catch (err) {
            //   console.log("Error",err);
            // }

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



