const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.app
      .get("authdao")
      .postUser([req.body.name, hashedPassword], (status, data) => {
        res.status(status);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an error creating the user.");
  }
});

// fix this
router.post("/login", async (req, res) => {
  const authdao = req.app.get("authdao");
  console.log(req.body.name);

  await authdao.checkUser(req.body.name, (status, data) => {
    const user = data;
  });

  //Check if the user exists
  console.log(user);
  if (!user) return res.status(400).send("Username does not exist.");

  //Check if password is correct
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Invalid password.");

  res.send("Logged in!");
});

module.exports = router;
