import nodemailer from 'nodemailer';

export const sendEmailClient = (host_email, server_port, server_email, pass_server_email, user_email, password_generated) => {
  
  // create reusable transporter object using the default SMTP transport

  const transporter = nodemailer.createTransport({
    host: host_email,
    port: server_port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: server_email, // generated gmail or other user
      pass: pass_server_email // generated gmail or other app password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols

  const mailOptions = {
    from: "Extraescolares Ciudad de los Angeles <cdangeles.extraescolares@gmail.com>", // sender address
    to: user_email, // list of receivers
    subject: 'Password for Web', // Subject line
    text: password_generated, // plain text body
    html: `<b>${password_generated}</b>` // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}