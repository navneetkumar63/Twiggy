import express from "express";
import cors from "cors";
import  connectDB  from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config';
import orderRouter from "./routes/orderRoute.js";

// App configuration
const app = express();
const port = process.env.PORT || 4000; // Use environment variable for port

// Middleware
app.use(express.json());
app.use(cors()); // Only use once

// Database connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter)

// Default route
app.get('/', (req, res) => {
    res.send("API is working");
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
