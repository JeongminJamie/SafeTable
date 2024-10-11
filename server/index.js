import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import login from "./routes/login/login.js";
import register from "./routes/login/register.js";
import session from "express-session";
import { createProxyMiddleware } from "http-proxy-middleware";

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

// open api proxy 해결 구역
app.use(
  "/api",
  createProxyMiddleware({
    target: process.env.RESTARUANT_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  })
);

const port = 8080;
app.listen(port, () => {
  console.log(`Port number ${port} is running`);
});
