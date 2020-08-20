const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/" });
const fs = require("fs");

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.status(200).send("The image was uploaded successfully.");
});

router.delete("/:name", (req, res) => {
  try {
    fs.unlinkSync("./images/" + req.params.name);
    res.status(200).send("Image was deleted.");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
