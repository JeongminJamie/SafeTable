import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import login from "./routes/login/login.js";
import register from "./routes/login/register.js";
import { createProxyMiddleware } from "http-proxy-middleware";

// routes
import cardRoutes from "./routes/cardRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

dotenv.config({ path: ".env.local" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"));

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // 쿠키, 세션 허용
  })
);

app.use(express.json());
app.use("/login", login);
app.use("/register", register);
app.use("/api/card", cardRoutes);
app.use("/api/reservation", reservationRoutes);

// open api proxy 해결
// 안심식당 조회
app.use(
  "/api/restaurants",
  createProxyMiddleware({
    target: process.env.RESTARUANT_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/restaurants": "",
    },
  })
);

// 지역명 안심식당 조회
app.use(
  "/api/locations",
  createProxyMiddleware({
    target: process.env.LOCATION_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/locations": "",
    },
    secure: true,
  })
);

const port = 8080;
app.listen(port, () => {
  console.log(`Port number ${port} is running`);
});
