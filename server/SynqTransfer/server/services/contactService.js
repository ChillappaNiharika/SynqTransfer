const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.saveAndNotify = async ({ name, email, message }) => {
  // Save to DB
  const newMessage = new ContactMessage({ name, email, message });
  await newMessage.save();

  // Send email to support
  await transporter.sendMail({
    from: `"SynqTransfer Contact" <${process.env.MAIL_USER}>`,
    to: 'ashishyelisetty@gmail.com',
    subject: `📬 New Contact Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        <p style="font-size: 12px; color: gray;">Received on ${new Date().toLocaleString()}</p>
      </div>
    `
  });
};
