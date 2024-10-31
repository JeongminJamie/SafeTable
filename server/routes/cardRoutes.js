import express from "express";
import { getMyCard, saveCard } from "../controllers/cardController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/", verifyToken, getMyCard);
router.post("/", verifyToken, saveCard);

export default router;
