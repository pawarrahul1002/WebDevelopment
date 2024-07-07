// Importing required modules
const express = require("express");
const env = require("./config/environment");
const passportConfig = require("./config/passport_local");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const myMware = require("./config/middleware");
const MongoStore = require("connect-mongo");
const db = require("./config/mongoose");
const PORT = env.port;

// Creating an Express application
const app = express();

// Middleware for parsing incoming JSON requests
app.use(express.json());

// Middleware for parsing incoming URL-encoded form data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Middleware to serve static files from the 'assets' directory
app.use(express.static("assets"));

// Middleware for parsing cookies attached to the request
app.use(cookieParser());

// Middleware for integrating express-ejs-layouts into the application
app.use(expressLayouts);

// Setting to extract stylesheets referenced in layout files
app.set("layout extractStyles", true);

// Setting to extract scripts referenced in layout files
app.set("layout extractScripts", true);

// Setting the view engine to EJS (Embedded JavaScript)
app.set("view engine", "ejs");

// Setting the directory for views
app.set("views", "./views");

// Middleware for session management
app.use(
  session({
    secret: env.secret_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: env.mongoose_path,
    }),
  })
);

// Middleware for flash messages
app.use(flash());

// Middleware to set flash messages in response locals
app.use(myMware.setFlash);

// Middleware for initializing Passport authentication
app.use(passport.initialize());

// Middleware for persistent login sessions
app.use(passport.session());

// Middleware to set authenticated user in response locals
app.use(passport.setAuthenticatedUser);

// Mounting routes
app.use("/", require("./routes"));

// Starting the server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
