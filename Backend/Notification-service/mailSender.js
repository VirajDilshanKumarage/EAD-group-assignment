const nodeMailer = require('nodemailer');
const MailGen = require('mailgen');

const { EMAIL, PASSWORD } = require('./env.js');

class MailSender {
  constructor() {
    this.config = {
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    };

    this.transporter = nodeMailer.createTransport(this.config);

    this.mailGenerator = new MailGen({
      theme: 'salted',
      product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/',
      },
    });
  }

  async sendEmail(email) {
    const receiver = email;
    console.log('Email:', email);
    let status = 500;

    try {
      const response = {
        body: {
          title: 'EcomEAD!',
          intro: 'Order Confirmation!',
          greeting: 'Dear Sir/Madam',
        },
      };

      const mail = this.mailGenerator.generate(response);

      const message = {
        from: EMAIL,
        to: receiver,
        subject: 'Order Confirmation!',
        html: mail,
      };

      await this.transporter.sendMail(message);

      status = 200;
      console.log('Email sent successfully');
    } catch (err) {
      status = 500;
      console.log(`Error sending Message ${err}`);
    }

    return status;
  }
}

const mailSender = new MailSender();

module.exports = mailSender;
