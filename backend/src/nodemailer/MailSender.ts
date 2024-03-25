import {createTransport } from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()




export const mailer = (subject:string, text:string, to:string) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PW
    }
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'AVDS SCE - ' + subject,
    text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

