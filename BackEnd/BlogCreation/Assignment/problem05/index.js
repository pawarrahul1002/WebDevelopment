const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.send("get");
});
app.post("/", (req, res) => {
    res.send("post");
});
app.put("/", (req, res) => {
    res.send("put");
});
app.delete("/", (req, res) => {
    res.send("delete");
});

app.listen(3000, () => {
    console.log("server is listening at 3000");
});


// Write your code here

module.exports = app;
