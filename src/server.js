import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";


dotenv.config();

await connectDB();



console.log("Mongo Db connected");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nobzo API is  Running 🚀");
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
