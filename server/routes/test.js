import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("testing express");
});

export default router;
