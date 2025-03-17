const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Configure email transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Transporter verification failed:", error.message);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});

// Generate a 6-digit OTP
const generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
};

// Send OTP email
const sendOTP = async (email, otp, type = "verification") => {
  try {
    if (!email || !otp) {
      throw new Error("Email and OTP are required");
    }

    const subject =
      type === "reset"
        ? "Password Reset OTP - Job Fusion"
        : "Email Verification OTP - Job Fusion";

    const text =
      type === "reset"
        ? `Your OTP for password reset is: ${otp}. This OTP will expire in 10 minutes.`
        : `Your OTP for email verification is: ${otp}. This OTP will expire in 10 minutes.`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #3b82f6; text-align: center;">Job Fusion - ${
          type === "reset" ? "Password Reset" : "Email Verification"
        }</h2>
        <p>Hello,</p>
        <p>Please use the following OTP to ${
          type === "reset" ? "reset your password" : "verify your email"
        }:</p>
        <div style="text-align: center; padding: 10px; background-color: #f0f9ff; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #1e40af; letter-spacing: 5px;">${otp}</h3>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you,<br>Job Fusion Team</p>
      </div>
    `;

    const mailOptions = {
      from: `"Job Fusion" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", email, "| Response:", info.response);
    return true;
  } catch (error) {
    console.error("❌ Error sending email to:", email, "| Error:", error.message);
    return false;
  }
};

// Export functions
module.exports = { generateOTP, sendOTP };
