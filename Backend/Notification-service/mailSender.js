const nodeMailer = require('nodemailer');
const {EMAIL,PASSWORD} = require('./env.js');
const MailGen = require('mailgen')


const mailHandler = async (email) => {

    const receiver = email;
    console.log('lifeeeeee',email);
    let status=500;

    try{

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
                title: 'EcomEAD!',
                intro:"Order Confirmation!",
                greeting: 'Dear Sir/Madam',
            }
        }
    
        let mail = mailGenerator.generate(response);
    
        let message = {
            from:EMAIL,
            to:receiver,
            subject:"Order Confirmation!",
            html:mail
        }
    
        transporter
        .sendMail(message)
        .then(()=>{
            status = 200;
            console.log("Email sent successfully");
           
        })
        .catch((err)=>{
            status =500;
            console.log(`Error sending Message ${err}`);
        })
    }catch(err){
        console.log(err)
    }
    
    return status;
}

module.exports = {
    mailHandler
  };