import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";
const Port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

app.listen(Port, () => console.log(`Server running on the port ${Port}`));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
