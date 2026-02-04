import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const PORT = process.env.PORT || 8082;


const app = express();
dotenv.config();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
        .then(() => console.log("MongoDB connected successfully!"))
        .catch((error) => console.log(error))

app.get("/api/health", (req, res) => {
    res.send("API is running successfully");
});

app.listen(PORT, () => {
    console.log(`Server running successfully on PORT: ${PORT}`);
}); 
