import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import uploadRouter from "./route/upload.route.js";
import subCatRouter from "./route/subCategory.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
import addressRouter from "./route/address.route.js";
import orderRouter from "./route/order.route.js";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

// app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const PORT = 8080 || process.env.PORT;

app.get("/", (request, response) => {
  /// server to client
  response.json({
    message: "Server to client " + PORT,
  });
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCatRouter);
app.use("/api/product", productRouter);
app.use("/api/cart/", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("SERVER Running", PORT);
  });
});
