// Please don't change the pre-written code.

const express = require("express");
const app = express();

const logRequest = (req,res,next) => {
  // Write your code here
  console.log(req.method); // gives you the request Method (e.g: GET, POST, PUT, DELETE, etc.)
  console.log(req.path); // gives you the request path (for this case, path will be '/') 
  next();
};

// logRequest();

app.get("/", logRequest,(req, res) => {
  res.send("Coding Ninjas!");
});

module.exports = app;
