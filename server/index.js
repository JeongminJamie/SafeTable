import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
//import test from "./routes/test.js";
import login from "./routes/login/login.js";
import register from "./routes/login/register.js";

dotenv.config({ path: ".env.local" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"));

const app = express();
app.use(cors());
app.use(express.json());
//app.use("/", test);
app.use("/login", login);
app.use("/register", register);

const port = 8080;
app.listen(port, () => {
  console.log(`Port number ${port} is running`);
});
