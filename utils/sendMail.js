import nodemailer from 'nodemailer';

export const sendEmailClient = (host_email, server_port, server_email, pass_server_email, user_email, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: host_email,
    port: server_port,
    secure: false,
    auth: {
      user: server_email,
      pass: pass_server_email
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: "Extraescolares Ciudad de los Angeles <cdangeles.extraescolares@gmail.com>",
    to: user_email,
    subject: subject,
    html: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};
