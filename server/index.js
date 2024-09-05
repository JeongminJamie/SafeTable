import express from "express";
const app = express();
import test from "./routes/test.js";

app.use("/", test);

const port = 8080;
app.listen(port, () => {
  console.log(`Port number ${port} is running`);
});
