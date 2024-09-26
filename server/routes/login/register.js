import express from "express";
import User from "../../models/user.js";
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

router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  // 토큰 검증 로직...
  // 인증 성공 시 사용자의 인증 상태 업데이트

  res.send("Email verified successfully");
});

export default router;
