import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const Port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(Port, () => console.log(`Server running on the port ${Port}`));
