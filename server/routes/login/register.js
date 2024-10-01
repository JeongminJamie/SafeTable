import express from "express";
import User from "../../models/user.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Email from "../../models/emailcheck.js";

dotenv.config({ path: ".env.local" });

const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.NAVER_USER,
    pass: process.env.NAVER_PASS,
  },
  host: "smtp.naver.com",
  port: 465, // SSL 포트
  secure: true,
});

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

    const newUser = new User({
      name: user_name,
      email: user_email,
      password: user_password,
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

//이거 이메일 중복 x, 실제 이메일로 발송 안되는 이유 찾기
//토큰 해결하기
router.post("/send-verification-email", async (req, res) => {
  const { email } = req.body;

  // 인증 코드 만료 시간 설정 (예: 10분 후)
  const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10분 후
  const verificationToken = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number

  try {
    // 이메일로 유저 검색
    let user = await Email.findOne({ email });

    if (!user) {
      // 새로운 유저인 경우, 유저 생성 및 인증 코드 저장
      user = new Email({
        email: email,
        verificationCode: verificationToken,
        verificationCodeExpires: expirationTime,
        isVerified: false,
      });
    } else {
      // 기존 유저라면 인증 코드와 만료 시간 업데이트
      user.verificationCode = verificationToken;
      user.verificationCodeExpires = expirationTime;
    }

    // DB에 저장
    await user.save();
    await sendVerificationEmail(email, verificationToken); // Ensure this is awaited

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error in sending verification email:", error);
    res.status(500).json({ message: "Error sending verification email" });
  }
});

router.post("/verify-email", async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    // 이메일로 유저 검색
    const user = await Email.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 인증 코드와 만료 시간 확인
    if (
      user.verificationCode !== verificationCode ||
      user.verificationCodeExpires < new Date()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    // 인증 성공 시, isVerified 필드 업데이트
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
