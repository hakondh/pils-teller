const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // Access environment variables
const path = require("path");
const port = process.env.PORT;

app.use(express.json()); // Body parser
app.use(cors()); // Fixes CORS block

// Setting up the connection pool for database
let pool = mysql.createPool({
  connectionLimit: 30,
  host: process.env.DB_HOST,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "pilstellerdb",
  debug: false,
});

// Make the images-folder publicly accessible so that the front-end can access the profile pictures
app.use("/images", express.static("images"));

/* Auth */
const authRoute = require("./routes/auth");
const AuthDao = require("./dao/AuthDao");
app.use("/auth", authRoute);
app.set("authdao", new AuthDao(pool));

/* Users */
const usersRoute = require("./routes/users");
const UsersDao = require("./dao/UsersDao.js");
app.use("/users", usersRoute);
app.set("usersdao", new UsersDao(pool));

/* Beers */
const beersRoute = require("./routes/beers");
const BeersDao = require("./dao/BeersDao");
app.use("/beers", beersRoute);
app.set("beersdao", new BeersDao(pool));

const imagesRoute = require("./routes/images");
app.use("/images", imagesRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  console.log("We are in production...");
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log("Server started on port " + port));
