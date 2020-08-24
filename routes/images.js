const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/" });
const fs = require("fs");

router.delete("/:name", (req, res) => {
  console.log("DELETE /images/:name");
  try {
    fs.unlinkSync("./images/" + req.params.name);
    res.status(200).send("Image was deleted.");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
