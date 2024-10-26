import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { saveReservation } from "../controllers/reservationController.js";
const router = express.Router();

router.post("/", verifyToken, saveReservation);

export default router;
