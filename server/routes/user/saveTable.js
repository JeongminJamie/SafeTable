import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const router = express.Router();
router.post("/save-table", async (req, res) => {});

export default router;
