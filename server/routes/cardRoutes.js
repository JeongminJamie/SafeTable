import express from "express";
import {
  getCardNumber,
  saveCardNumber,
} from "../controllers/cardController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/", verifyToken, getCardNumber);
router.post("/", verifyToken, saveCardNumber);

export default router;
