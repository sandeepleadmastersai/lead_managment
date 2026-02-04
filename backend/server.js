import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 8082;


const app = express();
dotenv.config();
app.use(express.json());

connectDB();

app.get("/api/health", (req, res) => {
    res.send("API is running successfully");
});

app.listen(PORT, () => {
    console.log(`Server running successfully on PORT: ${PORT}`);
}); 
