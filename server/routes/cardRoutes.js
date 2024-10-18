import express from "express";
import { saveCardNumber } from "../controllers/cardController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/", verifyToken, saveCardNumber);

export default router;
