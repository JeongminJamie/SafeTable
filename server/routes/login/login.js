import express from "express";
import User from "../../models/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import session from "express-session";

dotenv.config({ path: ".env.local" });

const router = express.Router();

// 로그인
router.post("/", async (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  try {
    const user = await User.findOne({ email: user_email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(user_password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 } // 토큰 만료 시간 1시간
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
