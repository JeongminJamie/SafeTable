import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import login from "./routes/login/login.js";
import register from "./routes/login/register.js";
import session from "express-session";

dotenv.config({ path: ".env.local" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"));

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // 정확한 도메인만 입력
    credentials: true, // 쿠키, 세션 허용
  })
);
app.use(express.json());
app.use("/login", login);
app.use("/register", register);

// open api proxy 해결
// app.use()


const port = 8080;
app.listen(port, () => {
  console.log(`Port number ${port} is running`);
});
