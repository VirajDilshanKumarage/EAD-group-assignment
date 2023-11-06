const amqp = require("amqplib");
const { mailHandler } = require("../mailSender.js");
const { EMAIL, PASSWORD } = require("../env.js");
const MailGen = require("mailgen");
const nodeMailer = require("nodemailer");
// const Notification = require("../routes/notification.js");
const failedEmailHandler = require("../controller/notificationController.js");
const notification = require('../models/notification.js');

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

connect();
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    myFunction();
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
            console.log(`Error sending Message %%%%%%% ${err}`);
            const failedEmail = input.email;
            //////////////////////////////
            // try {
            //   // Check if a document with the email exists in the database
            //   const existingDocument = await notification.findOne({ failedEmail }); 

            //   if (existingDocument) {
            //     // If it exists, update the sendError field by incrementing it by 1
            //     existingDocument.sendError += 1;

            //     if (existingDocument.sendError >= 3) {
            //       // If sendError reaches 3 or more, delete the document
            //       await notification.deleteOne({ failedEmail });
            //       channel.nack(message);
            //       return res.status(200).json({
            //         success:
            //           "Document deleted due to sendError reaching 3 or more.",
            //       });
            //     } else {
            //       // Save the updated document
            //       await existingDocument.save();
            //       channel.nack(message);
            //       return res.status(200).json({
            //         success: "sendError updated successfully",
            //       });
            //     }
                
            //   } else {
            //     // If it doesn't exist, create a new document with auto-incremented notificationId
            //     const newPost = new notification({
            //       email:failedEmail,
            //       sendError: 0,
            //       notificationId: notificationIdCounter++,
            //     });
            //     await newPost.save();
            //     channel.nack(message);

            //     return res.status(200).json({
            //       success: "New document created successfully",
            //     });
            //   }
               

            // } catch (err) {
            //     console.log("DMCCCCCCCCCCCCCCC",err);
            // //   return res.status(400).json({
            // //     error: err.message,
            // //   });
            // return;
            // }
            return channel.nack(message);
            //////////////////////////////
            
          }else{
          console.log("Email sent successfully");
          channel.ack(message);
          }
        });

        // transporter
        // .sendMail(message)
        // .then(()=>{
        //     console.log("Email sent successfully");
        //     channel.ack(message);
        // })
        // .catch((err)=>{
        //     console.log(`Error sending Message ${err}`);
        //     // return channel.nack(message);
        // })
      } catch (err) {
        console.log("Error:", err);
      }
    });
    console.log("Waiting for messages...");
  } catch (ex) {
    console.error(ex);
  }
}

const myFunction = () => {
  console.log("hello there");
};
