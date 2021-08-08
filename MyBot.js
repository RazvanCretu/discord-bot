require("dotenv").config();
// require("./Client.js");

const express = require("express");
const client = require("./Client.js");
const app = express();

// console.log(client);

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public")).listen(port, () => {
  console.log("App up!");
});
