import express from "express";
import dotenv from "dotenv";
import Restaurant from "../../models/restaurant.js";
import { verifyToken } from "../../middleware/auth.js";
import User from "../../models/user.js";

dotenv.config({ path: ".env.local" });

const router = express.Router();

// 찜식당 조회 API
router.get("/saved-tables", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("savedRestaurants");
    res.status(200).json(user.savedRestaurants);
  } catch (error) {
    console.error("Error fetching saved restaurants:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// 찜식당 저장 API
router.post("/save-table", verifyToken, async (req, res) => {
  const { id, name, address, telephone, clicked } = req.body;
  const userId = req.userId;

  if (!id || !name || !address) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    let restaurant = await Restaurant.findOne({ id });

    if (!restaurant) {
      restaurant = new Restaurant({
        id,
        name,
        address,
        telephone: telephone || undefined,
        clicked,
      });
      await restaurant.save();
    }

    const user = await User.findById(userId);
    if (!user.savedRestaurants.includes(restaurant._id)) {
      user.savedRestaurants.push(restaurant._id);
      await user.save();
    }
    res.status(201).json({ message: "Restaurant saved successfully." });
  } catch (error) {
    console.error("Error saving restaurant:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//찜식당 삭제 API
router.delete("/delete-table/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const restaurant = await Restaurant.findOne({ id });
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    // 사용자 문서에서 `savedRestaurants` 목록에서 식당 ID 제거
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { savedRestaurants: restaurant._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // 레스토랑 테이블에서도 해당 식당 제거
    await Restaurant.deleteOne({ _id: restaurant._id });

    res.status(200).json({ message: "Restaurant removed successfully." });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
