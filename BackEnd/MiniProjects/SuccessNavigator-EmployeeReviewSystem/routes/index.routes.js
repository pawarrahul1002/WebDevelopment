import express from "express";
import user from"./user.routes.js"
import admin from "./admin.routes.js";
import employee from "./employee.routes.js";
const router = express.Router();

router.use("/",user);

router.use("/dashboard/admin",admin);
router.use("/dashboard/employee",employee);

export default router;