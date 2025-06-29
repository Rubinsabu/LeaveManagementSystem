import nodemailer from 'nodemailer';
import dotend from 'dotenv';
dotend.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});

export const sendLeaveNotification = async (employeeName, leave) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Leave Request from ${employeeName}`,
      text: `Employee ${employeeName} has applied for leave from ${leave.fromDate} to ${leave.toDate}.
  
  Type: ${leave.type}
  Reason: ${leave.reason}`,
};

try {
    await transporter.sendMail(mailOptions);
    console.log('Leave notification sent to admin');
  } catch (error) {
    console.error('Error sending email to admin', error);
  }
};

export const sendStatusNotification = async (email, status, leave) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Leave Request has been ${status}`,
      text: `Your leave request from ${leave.fromDate} to ${leave.toDate} has been ${status}.
  
  Type: ${leave.type}
  Reason: ${leave.reason}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Leave status notification sent to employee');
      } catch (error) {
        console.error('Error sending email to employee', error);
      }
};



