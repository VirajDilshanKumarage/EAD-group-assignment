const amqp = require("amqplib");
const { mailHandler } = require("../mailSender.js");
const {EMAIL,PASSWORD} = require('../env.js');
const MailGen = require('mailgen');
const nodeMailer = require('nodemailer');

let config = {
    service:"gmail",
    auth:{
        user:EMAIL,
        pass:PASSWORD
    }
}

let transporter = nodeMailer.createTransport(config);

let mailGenerator = new MailGen({
    theme:'salted',
    product:{
        name:'Mailgen',
        link:'https://mailgen.js/'
    }
})

let response = {
    body:{
        title: 'Welcome to EcomEAD!',
        name:'Dear Sir/Madam',
        intro:"Your order is being processed, and you will receive an email once it's on its way. If you have any questions or need assistance, please don't hesitate to contact our support team at ecomeadinfo@gmail.com.",
        outro:"Thank you for choosing EcomEAD!"
    }
}

let mail = mailGenerator.generate(response);

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        myFunction();
        channel.consume("jobs", async (message) => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.email}`)
            console.log('hava9');
            
            try{
        
                let emailMessage = {
                    from:EMAIL,
                    to:input.email,
                    subject:"Order Confirmation!",
                    html:mail
                }

                transporter.sendMail(emailMessage, (err, info) => {
                    if (err) {
                        console.log(`Error sending Message ${err}`);
                        return channel.nack(message);
                    }
                    console.log("Email sent successfully");
                    channel.ack(message);
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
                
            }catch(err){
                console.log("Error:",err);
            }
        })
        console.log("Waiting for messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}

const myFunction = () => {
    console.log('hello there');
}