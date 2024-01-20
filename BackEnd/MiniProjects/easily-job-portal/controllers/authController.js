const userModel = require("../models/userModel");

// exports.renderRegister = (req, res) => {
//   res.render('auth/register');
// };

exports.renderRegister = (req, res) => {
  res.render("auth/register", { currentUser: req.session.user }); // Assuming you store user information in the session
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = userModel.findUserByEmail(email);

  if (existingUser) {
    res.status(400).send("User with this email already exists.");
  } else {
    const newUser = userModel.createUser({ name, email, password });
    req.session.userId = newUser.id;
    res.redirect("/jobs");
  }
};

// exports.renderLogin = (req, res) => {
//   res.render('auth/login');
// };
exports.renderLogin = (req, res) => {
  res.render("auth/login", { currentUser: req.session.user }); // Assuming you store user information in the session
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = userModel.findUserByEmail(email);

  if (user && user.password === password) {
    req.session.userId = user.id;
    res.redirect("/jobs");
  } else {
    res.status(401).send("Invalid email or password.");
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
};
