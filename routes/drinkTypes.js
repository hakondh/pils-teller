const express = require("express");
const router = express.Router();

/* Get drink types */
router.get("/", (req, res) => {
  console.log("GET /drink-types");
  req.app.get("drinktypesdao").getDrinkTypes((status, data) => {
    res.status(status);
    res.json(data);
  });
});

module.exports = router;
