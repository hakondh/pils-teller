const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/" });
const verify = require("../middleware/verifyToken");

// Get all users
router.get("/", verify, (req, res) => {
  req.app.get("usersdao").getUsers((status, data) => {
    res.status(status);
    res.json(data);
  });
});

//Get a user
router.get("/:name", (req, res) => {
  req.app.get("usersdao").getUser(req.params.name, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

//Put an image
router.put("/:name/image", upload.single("image"), (req, res) => {
  req.app
    .get("usersdao")
    .putImage([req.file.filename, req.params.name], (status, data) => {
      res.status(status);
      res.json(data);
    });
});

module.exports = router;
