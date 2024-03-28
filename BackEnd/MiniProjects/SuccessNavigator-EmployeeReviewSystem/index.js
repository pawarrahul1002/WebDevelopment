// Import required modules using ES6 syntax
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import MongoStore from 'connect-mongo';
import expressLayouts  from "express-ejs-layouts";
// Import custom modules using ES6 syntax
import connectToMongoDB from './config/mongoose.js'; // Assuming this is the correct path to your mongoose configuration file
import passportConfig from './config/passport_local.js'; // Assuming this is the correct path to your passport configuration file
import setFlashMiddleware from './config/middleware.js';
// Assuming this is the correct path to your middleware configuration file
import routes from './routes/index.routes.js'; // Assuming this is the correct path to your routes file

// Import environment variables using dotenv
import dotenv from 'dotenv';
dotenv.config();

// Destructure environment variables
const { PORT, SECRET_KEY, MONGODB_URL } = process.env;

// Create the Express app
const app = express();

// Set up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');

// Configure express-session with MongoStore
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: MONGODB_URL,
    }),
  })
);

// Configure flash messages middleware
app.use(flash());
app.use(setFlashMiddleware);

// Initialize passport and configure sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Set up routes
app.use('/', routes);

// Start the server
app.listen(PORT, () =>{ console.log(`Server is running on port: ${PORT}`);
connectToMongoDB();

}
);
