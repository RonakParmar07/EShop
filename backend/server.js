import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const Port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// middleware to handle incoming data in different formats
app.use(express.json()); // parse incoming JSON data from HTTP requests.
app.use(express.urlencoded({ extended: true })); // parse incoming data from HTML forms
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(Port, () => console.log(`Server running on the port ${Port}`));
