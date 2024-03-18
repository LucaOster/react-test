const express = require("express");
require('dotenv').config()
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

let username ="";
let password ="";
app.post('/login', async(req, res) => {
  username = req.body.user.username;
  password = req.body.user.password;
  res.send({ message: "Login successfully"});
});
app.post('/username', async(req, res) => {
  res.send({ name: username});
});
app.listen(5000, () => {
    console.log("Server starting at 5000");
});