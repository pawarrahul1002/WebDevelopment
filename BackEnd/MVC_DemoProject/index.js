import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import path from "path";
import ejsLayout from "express-ejs-layouts";
import validateNewItem from "./src/middleware/validation.middleware.js";
import { uploadFile } from "./src/middleware/file-upload.middleware.js";
import session from "express-session";
import { auth } from "./src/middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middleware/lastvisit.middleware.js";

const app = express();
console.log(path.resolve);
app.use(express.static("public"));
app.use(express.static("src/views"));
app.use(cookieParser());
app.use(setLastVisit);
// setup view engine
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

console.log(path.resolve());
app.set("views", path.join(path.resolve(), "src", "views")); // "MVC_DemoProject",
app.use(ejsLayout);
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// create an instance of ProductController
const productController = new ProductController();
const userController = new UserController();
app.get("/", auth, productController.getProducts);

app.get("/new", auth, productController.getAddForm);
app.get("/register", userController.getRegister);
app.post("/register", userController.postRegister);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);

app.post(
  "/add-product",
  auth,
  uploadFile.single("imageUrl"),
  validateNewItem,
  productController.postNewProduct
);
app.post(
  "/update-product",
  auth,
  validateNewItem,
  productController.postUpdateProduct
);
app.post("/delete-product/:id", auth, productController.postDeleteProduct);
app.get("/update-product/:id", auth, productController.getUpdateProductView);

app.get("/logout", userController.logout);
// return res.send('Welcome to Inventory App');
app.listen(3400, () => {
  console.log("app is listening on port 3400");
});
