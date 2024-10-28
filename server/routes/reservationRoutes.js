import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getMyReservation, saveReservation } from "../controllers/reservationController.js";
const router = express.Router();

router.get("/", verifyToken, getMyReservation);
router.post("/", verifyToken, saveReservation);

export default router;
