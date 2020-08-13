const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");

// Get all users
router.get("/", verify, (req, res) => {
  req.app.get("usersdao").getUsers((status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.post("/", (req, res) => {
  console.log(req.body.amount);
  req.app
    .get("beersdao")
    .postBeers([req.body.amount, req.body.user_id], (status, data) => {
      res.status(status);
      res.json(data);
    });
});

module.exports = router;
