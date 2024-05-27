const nodemailer = require('nodemailer')
const emailConfig = require('./emailConfig')
const sendEmail = async (email, subject, body) => {
  const transporter = await emailConfig();

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject,
    html: body,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
    console.log(
      `URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`,
    );
  } catch (error) {
    console.log(`Error sending email: ${error}`);
  }
};

module.exports = sendEmail;