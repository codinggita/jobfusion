const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Generate a 6-digit OTP
const generateOTP = () => {
  return otpGenerator.generate(6, { 
    upperCaseAlphabets: false, 
    lowerCaseAlphabets: false, 
    specialChars: false 
  });
};

// Send OTP via email
const sendOTP = async (email, otp, isPasswordReset = false) => {
  try {
    const subject = isPasswordReset 
      ? 'Password Reset OTP - Job Fusion' 
      : 'Email Verification OTP - Job Fusion';
    
    const text = isPasswordReset
      ? `Your OTP for password reset is: ${otp}. This OTP will expire in 10 minutes.`
      : `Your OTP for email verification is: ${otp}. This OTP will expire in 10 minutes.`;
    
    const html = isPasswordReset
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #3b82f6; text-align: center;">Job Fusion - Password Reset</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password. Please use the following OTP to complete the process:</p>
          <div style="text-align: center; padding: 10px; background-color: #f0f9ff; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #1e40af; letter-spacing: 5px;">${otp}</h3>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Thank you,<br>Job Fusion Team</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #3b82f6; text-align: center;">Job Fusion - Email Verification</h2>
          <p>Hello,</p>
          <p>Thank you for registering with Job Fusion. Please use the following OTP to verify your email address:</p>
          <div style="text-align: center; padding: 10px; background-color: #f0f9ff; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #1e40af; letter-spacing: 5px;">${otp}</h3>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>Thank you,<br>Job Fusion Team</p>
        </div>
      `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = {
  generateOTP,
  sendOTP
};
