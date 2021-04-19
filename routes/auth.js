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

router.post("/register", async (req, res) => {
  try {
    // Check if the name is already in use
    const authdao = req.app.get("authdao");
    console.log("Checking if the name is already taken...");
    await authdao.checkUserName(req.body.name, (status, data) => {
      if (data.rows.length > 0) {
        console.log("Name is already taken.");
        return res.status(400).send("Navnet er allerede tatt.");
      }
    });
    await authdao.checkUserEmail(req.body.email, (status, data) => {
      if (data.rows.length > 0) {
        console.log("Email is already taken.");
        return res.status(400).send("Mailen er allerede i bruk.");
      }
    });
    console.log("Name is available!");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("POST /users");
    authdao.postUser([req.body.name, req.body.email, hashedPassword], (status, data) => {
      const user = data.rows[0]
      const token = createToken(user.id, user.name, user.email, user.image, user.reg_date)
      res.status(200).send({
        accessToken: token,
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
    authdao.checkUserEmail(req.body.email, async (status, data) => {
      // Check if the user exists
      if (data.rows.length == 0) {
        console.log("User does not exist.");
        return res
          .status(400)
          .send('Brukeren "' + req.body.name + '" finnes ikke.');
      }
      console.log("The user exists!");
      console.log("Checking if the password is correct...");
      //Check if password is correct
      console.log(data.rows)
      const user = data.rows[0];
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        console.log("The password is incorrect.");
        return res.status(400).send("Ugyldig passord.");
      }
      console.log("The password is correct!");
      console.log("Creating a token and thus signing in the user...");
      //Create a token if the login was successful
      const token = createToken(user.id, user.name, user.email, user.image, user.reg_date)
      res.status(200).send({
        accessToken: token,
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
});

function createToken(userId, userName, userEmail, userImage, userRegDate) {
  return jwt.sign({ user: {id: userId, name: userName, email: userEmail, image: userImage, reg_date: userRegDate} }, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  }); // This token will expire in 24 hours
}

module.exports = router;
