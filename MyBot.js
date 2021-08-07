require("dotenv").config();
require("./Client.js");

const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

app
  .use(express.static(__dirname + "/public"))
  .get("/", (req, res) => {
    res.sendFile("index.html");
  })
  .listen(port, () => {
    console.log("App up!");
  });
