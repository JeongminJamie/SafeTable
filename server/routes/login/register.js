import express from "express";
import User from "../../models/user.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Email from "../../models/emailcheck.js";
import { transporter } from "../../config/nodemailer.js";

dotenv.config({ path: ".env.local" });

const sendVerificationEmail = async (userEmail, verificationToken) => {
  const mailOptions = {
    from: process.env.NAVER_USER,
    to: userEmail,
    subject: "Email Verification",
    text: `Your verification code is: ${verificationToken}`,
    html: `<p>Your verification code is: <strong>${verificationToken}</strong></p>`,
  };

  console.log("Sending email with options:", mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

const router = express.Router();

// 이멜, 비번, 이름, 연락처
router.post("/", async (req, res) => {
  const { user_email, user_password, user_name, user_contact } = req.body;

  if (!user_email || !user_password || !user_name || !user_contact) {
    res.status(400).json({
      success: false,
      msg: "Please enter all fields",
    });
  }

  if (user_password.length < 6) {
    res.status(400).json({
      success: false,
      msg: "Password must be at least 6 characters",
    });
  }

  try {
    // 중복 이메일 확인
    const existingUser = await User.findOne({ email: user_email });
    if (existingUser) {
      console.log("Existing user email:", existingUser.email); // 확인을 위한 로그
      return res.status(400).json({
        success: false,
        msg: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10); // (암호화 강도 설정)
    const hashedPassword = await bcrypt.hash(user_password, salt); // 비밀번호 해시화

    const newUser = new User({
      name: user_name,
      email: user_email,
      password: hashedPassword,
      contact: user_contact,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
});

router.post("/send-verification-email", async (req, res) => {
  const { email } = req.body;

  // 중복 이메일 확인
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      msg: "Email already exists, please use a different email",
    });
  }

  const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
  const verificationToken = Math.floor(100000 + Math.random() * 900000);

  try {
    let user = await Email.findOne({ email });

    if (!user) {
      user = new Email({
        email: email,
        verificationCode: verificationToken,
        verificationCodeExpires: expirationTime,
        isVerified: false,
      });
    } else {
      user.verificationCode = verificationToken;
      user.verificationCodeExpires = expirationTime;
    }

    await user.save();
    await sendVerificationEmail(email, verificationToken);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error in sending verification email:", error);
    res.status(500).json({ message: "Error sending verification email" });
  }
});

router.post("/verify-email", async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await Email.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (
      user.verificationCode !== verificationCode ||
      user.verificationCodeExpires < new Date()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    // user.verificationCode = null; // 인증 완료 후 코드 삭제
    // user.verificationCodeExpires = null;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying email" });
  }
});
export default router;
