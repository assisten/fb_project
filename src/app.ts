import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import machineRouter from "./routes/machine.routes";




// middleware
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());


// routes
app.use("/api/auth", authRouter);
app.use("/api/machine", machineRouter);

mongoose
  .connect("mongodb://localhost:27017/fb-collection")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((e) => {
    console.error(e);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
