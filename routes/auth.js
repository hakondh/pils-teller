const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    // Check if the username is already in use
    const authdao = req.app.get("authdao");
    authdao.checkUser(req.body.name, (status, data) => {
      if (data.length > 0)
        return res.status(400).send("Username already exists.");
    });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    authdao.postUser([req.body.name, hashedPassword], (status, data) => {
      res.status(status);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an error creating the user.");
  }
});

router.post("/login", (req, res) => {
  try {
    const authdao = req.app.get("authdao");

    authdao.checkUser(req.body.name, (status, data) => {
      // Check if the user exists
      if (data.length == 0) {
        return res.status(400).send("The user does not exist.");
      }
      //Check if password is correct
      const user = data[0];
      const valid = bcrypt.compare(req.body.password, user.password);
      if (!valid) return res.status(400).send("Invalid password.");

      //Create a token if the login was successful
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).send(token);
    });
  } catch (err) {
    console.log(err);
    res.send(500).send("There was an error logging in.");
  }
});

module.exports = router;
