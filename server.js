const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const port = 5000;
// Maybe add body-parser? req.body has worked so far...

app.use(express.json());
app.use(cors());
// Allow access to XMLHttpRequest (fix block by CORS)
// Commented out, as we can use the cors package insted
/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  next();
}); */

dotenv.config(); // Access environment variables

// Setting up the connection pool
let pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "pilstellerdb",
  debug: false,
});

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

app.listen(port, () => console.log("Server started on port " + port));
