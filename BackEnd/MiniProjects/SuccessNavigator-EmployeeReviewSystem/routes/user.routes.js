import express from "express";
import passport from "passport";
import {
  home,
  signup,
  createAccount,
  createSession,
  signout,
} from "../controller/user.controller.js";

const router = express.Router();



// to render homepage / signin page
router.get('/', home);

// to render the sign up page
router.get('/sign-up',signup);

// for signing out a user 
router.get('/signout',signout);

// for signin a user / creating session
router.post('/create-session', 
    // using passport for authentication
    passport.authenticate(
        // strategy
        'local',
        // if signing in fails
        {failureRedirect:'/'}),

    // controller
    createSession);

// creating a new user
router.post('/create-account',createAccount);

// export the router
export default router;


