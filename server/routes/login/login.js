import express from "express";
import User from "../../models/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyToken } from "../../middleware/auth.js";

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
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
      //{ expiresIn: 3600 } // 토큰 만료 시간 1시간
    );

    // // 액세스 토큰 발급 (1시간 유효)
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    // // 리프레시 토큰 발급 (7일 유효)
    // const refreshToken = jwt.sign(
    //   { id: user._id },
    //   process.env.JWT_REFRESH_SECRET,
    //   { expiresIn: "7d" }
    // );

    // // 리프레시 토큰을 DB에 저장
    // user.refreshToken = refreshToken;
    // await user.save(); // 저장

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

// 토큰 검증 및 유저 정보 가져오기
router.get("/verify", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        location: user?.location,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// // 리프레시 토큰을 통해 액세스 토큰 재발급
// router.post("/refresh-token", async (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res
//       .status(401)
//       .json({ success: false, message: "No token provided" });
//   }

//   try {
//     // DB에서 리프레시 토큰을 가진 유저 찾기
//     const user = await User.findOne({ refreshToken });
//     if (!user) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Invalid refresh token" });
//     }

//     // 리프레시 토큰 검증
//     jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
//       if (err) {
//         return res
//           .status(403)
//           .json({ success: false, message: "Invalid refresh token" });
//       }

//       // 새로운 액세스 토큰 발급 (1시간 유효)
//       const newAccessToken = jwt.sign(
//         { id: decoded.id }, // 기존 토큰에서 사용자 ID 추출
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );

//       res.json({
//         success: true,
//         accessToken: newAccessToken,
//       });
//     });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });

/* 비밀번호 바꾸기 */
router.post("/change-password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide both current and new password",
    });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the current password",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* 유저 프로필 바꾸기 */
router.post("/change-Profile", verifyToken, async (req, res) => {
  const { newName, newContact, newLocation } = req.body;

  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (newName) user.name = newName;
    if (newContact) user.contact = newContact;
    if (newLocation) user.location = newLocation;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        contact: user.contact,
        location: user.location,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
