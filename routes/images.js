const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/" });
const fs = require("fs");
const { cloudinary } = require("../utils/cloudinary");

imgur.setAPIUrl("https://api.imgur.com/3/");
imgur.setCredentials(
  process.env.IMGUR_EMAIL,
  process.env.IMGUR_PASSWORD,
  process.env.IMGUR_CLIENT_ID
);

router.post("/", async (req, res) => {
  /* const encodedImage = req.files.image.data.toString("base64"); */
  try {
    const fileStr = req.body.data;
    const uploadRes = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "pilsteller",
    });
    res.json({ url: uploadRes.url });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

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
