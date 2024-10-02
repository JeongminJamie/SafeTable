import express from "express";
const router = express.Router();

// 로그인
router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (username === "testUser" && password === "testPass") {
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

export default router;
