const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");

/* Get beers */
router.get("/", (req, res) => {
  req.app.get("beersdao").getBeers((status, data) => {
    res.status(status);
    res.json(data);
  });
});

/* Get the weekly drunkard */
router.get("/weekly-drunkard", (req, res) => {
  req.app.get("beersdao").getWeeklyDrunkard((status, data) => {
    res.status(status);
    res.json(data);
  });
});

/* Post beers */
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
