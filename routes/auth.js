const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

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
      const valid = bcrypt.compare(req.body.password, data[0].password);
      if (!valid) return res.status(400).send("Invalid password.");
      res.send("Logged in!");
    });
  } catch (err) {
    console.log(err);
    res.send(500).send("There was an error logging in.");
  }
});

module.exports = router;
