import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  deleteMyReservation,
  getMyReservation,
  saveReservation,
} from "../controllers/reservationController.js";
const router = express.Router();

router.get("/", verifyToken, getMyReservation);
router.post("/", verifyToken, saveReservation);
router.delete("/:reservationId", verifyToken, deleteMyReservation);

export default router;
