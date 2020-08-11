const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

router.post("/register", async (req, res) => {
  try {
    // Check if the name is already in use
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

    authdao.checkUser(req.body.name, async (status, data) => {
      // Check if the user exists
      if (data.length == 0) {
        return res
          .status(400)
          .send('Brukeren "' + req.body.name + '" finnes ikke.');
      }
      //Check if password is correct
      const user = data[0];
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) return res.status(400).send("Ugyldig passord.");

      //Create a token if the login was successful
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: 86400,
      }); // This token will expire in 24 hours
      res.status(200).send({
        name: req.body.name,
        accessToken: token,
      });
    });
  } catch (err) {
    console.log(err);
    res.send(500).send("There was an error logging in.");
  }
});

router.post("/check-login-state", (req, res) => {
  const token = req.get("auth-token");
  console.log(token);
  res.status(200).send("ok");
});

module.exports = router;
