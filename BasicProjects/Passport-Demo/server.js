const express = require("express");
const app = express();
const { connectMongoose, User } = require("./database");
const passport = require("passport");
const { initializingPassport, isAuthenticated } = require("./passportConfig");
const expressSession = require("express-session");

// Initialize Passport
initializingPassport(passport);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
  expressSession({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).send("User already exists");
  }

  const newUser = await User.create(req.body);
  res.status(201).send(newUser);
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    successRedirect: "/",
  })
);

app.get("/profile", isAuthenticated, (req, res) => {
  res.send(req.user);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Start server
app.listen(3000, () => {
  connectMongoose();
  console.log("server is listening on port 3000");
});
