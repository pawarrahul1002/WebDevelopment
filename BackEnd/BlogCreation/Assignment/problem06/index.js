// Please don't change the pre-written code

const express = require("express");
const server = express();

// Set custom header on response object
const setCustomHeader = (res, contentType, applicationType) => {
  // Write your code here
  res.set(contentType,applicationType);
  console.log(contentType+" with value "+applicationType+" has been successfully set!");
};

// Route that uses the setCustomHeader function
server.get("/", (req, res) => {
  setCustomHeader(res, "Content-Type", "application/json");
  res.send(`get method called!`);
});

module.exports = { setCustomHeader, server };
