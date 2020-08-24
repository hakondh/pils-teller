const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/" });
const fs = require("fs");
const verify = require("../middleware/verifyToken");

// Get all users
router.get("/", verify, (req, res) => {
  console.log("GET /users");
  req.app.get("usersdao").getUsers((status, data) => {
    res.status(status);
    res.json(data);
  });
});

//Get a user
router.get("/:name", (req, res) => {
  console.log("GET /users/:name");
  req.app.get("usersdao").getUser(req.params.name, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

//Put an image
router.put("/:id/image", upload.single("image"), (req, res) => {
  console.log("PUT /users/:id/image");
  req.app
    .get("usersdao")
    .putImage([req.file.filename, req.params.id], (status, data) => {
      res.status(status).send({ image: req.file.filename });
    });
});

// Get sum of beers for a user
router.get("/:id/beers", (req, res) => {
  console.log("GET /users/:id/beers");
  req.app.get("usersdao").getUserBeers(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

// Get the image for a user
router.get("/:id/image", (req, res) => {
  console.log("GET /users/:id/image");
  req.app.get("usersdao").getUserImage(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

module.exports = router;
