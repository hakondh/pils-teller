const express = require("express");
const router = express.Router();
const fs = require("fs");
const { cloudinary } = require("../utils/cloudinary");

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
