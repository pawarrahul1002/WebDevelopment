import express from "express";
import productRoutes from "./src/features/product/routes/product.routes.js";
import userRoutes from "./src/features/user/routes/user.routes.js";
import cartRouter from "./src/features/cart/routes/cart.routes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRouter);

export default app;
