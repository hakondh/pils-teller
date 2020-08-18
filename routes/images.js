const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/" });

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.status(200).send("The image was uploaded successfully.");
});

module.exports = router;
