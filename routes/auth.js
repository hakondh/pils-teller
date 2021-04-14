const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/user/:email", (req, res) => {
    //Check if the user exists
    const authdao = req.app.get("authdao")
    authdao.checkUser(req.params.email, (status, data) => {
      res.status(200).send(data)
    })
})

router.post("/user", (req, res) => {
  try{
    const authdao = req.app.get("authdao")
    authdao.postUser([req.body.email, req.body.name], (status, data) => {
      res.status(201).send(data);
    });
  }
  catch(err) {
    console.log(err)
    res.status(500).send(err)
  }
  
})

/* router.post("/register", (req, res) => {
  try {
    // Check if the name is already in use
    const authdao = req.app.get("authdao");
    console.log("Checking if the name is already taken...");
    authdao.checkUser(req.body.name, async (status, data) => {
      if (data.length > 0) {
        console.log("Name is already taken.");
        return res.status(400).send("Navnet er allerede tatt.");
      }
      console.log("Name is available!");
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      console.log("POST /users");
      authdao.postUser([req.body.name, hashedPassword], (status, data) => {
        res.status(200).send(data);
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an error creating the user.");
  }
});

router.post("/login", (req, res) => {
  try {
    const authdao = req.app.get("authdao");
    console.log("Checking if the user exists...");
    authdao.checkUser(req.body.name, async (status, data) => {
      // Check if the user exists
      if (data.length == 0) {
        console.log("User does not exist.");
        return res
          .status(400)
          .send('Brukeren "' + req.body.name + '" finnes ikke.');
      }
      console.log("The user exists!");
      console.log("Checking if the password is correct...");
      //Check if password is correct
      const user = data[0];
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        console.log("The password is incorrect.");
        return res.status(400).send("Ugyldig passord.");
      }
      console.log("The password is correct!");
      console.log("Creating a token and thus signing in the user...");
      //Create a token if the login was successful
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: 86400,
      }); // This token will expire in 24 hours
      res.status(200).send({
        id: user.id,
        name: req.body.name,
        accessToken: token,
        image: user.image,
        reg_date: user.reg_date,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an error logging in.");
  }
});

router.post("/check-login-state", (req, res) => {
  console.log("Checking login state...");
  const token = req.get("auth-token");
  res.status(200).send("ok");
}); */

module.exports = router;
