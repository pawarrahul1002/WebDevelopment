import express from "express";
import passport from "passport";
import {
    employee,
    addReview
} from "../controller/employee.controller.js";

const router = express.Router();



// to render the dashboard for an employee
router.get('/',
            // check whether the user is logged in not
            passport.checkAuthentication,
            // to check whether the logged in user is employee or not
            passport.isEmployee,
            // controller
            employee);


// for giving feedback to a fellow employee
router.post('/addReview',
            // check whether the user is logged in or not
            passport.checkAuthentication,
            // check whether logged in user is an employee or not
            passport.isEmployee,
            // controller
            addReview);





export default router;

