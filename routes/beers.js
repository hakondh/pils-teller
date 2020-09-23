const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");

/* Get beers */
router.get("/", (req, res) => {
  console.log("GET /beers");
  req.app.get("beersdao").getBeers((status, data) => {
    res.status(status);
    res.json(data);
  });
});

/* Get the weekly drunkard */
router.get("/weekly-drunkard", (req, res) => {
  console.log("GET /weekly-drunkard");
  req.app.get("beersdao").getWeeklyDrunkard((status, data) => {
    res.status(status);
    res.json(data);
  });
});

/* Get the greatest contributor */
router.get("/greatest-contributor", (req, res) => {
  console.log("GET /greatest-contributor");
  req.app.get("beersdao").getGreatestContributor((status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.get("/beer-sum-per-user", (req, res) => {
  console.log("GET /beer-sum-per-user");
  req.app.get("beersdao").getBeerSumPerUser((status, data) => {
    res.status(status);
    res.json(data);
  });
});

/* Post beers */
router.post("/", (req, res) => {
  console.log("POST /beers");
  req.app
    .get("beersdao")
    .postBeers(
      [req.body.amount, req.body.reg_date, req.body.user_id],
      (status, data) => {
        res.status(status);
        res.json(data);
      }
    );
});

router.get("/beer-over-time", (req, res) => {
  console.log("GET /beer-over-time");
  req.app.get("beersdao").getBeerOverTime((status, data) => {
    res.status(status);
    res.json(data);
  });
});

module.exports = router;
