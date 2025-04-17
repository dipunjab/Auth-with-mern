import dotenv from "dotenv"
dotenv.config();

import express from "express";
import { connectDB } from "./db/db.js";
import authRoutes from "./routes/auth.route.js"

const app = express();
const PORT = process.env.PORT || 5000

app.get("/", (req,res)=>{
    res.send("Welcome")
});

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);    
});