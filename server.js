const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
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

// Setting up the connection pool
let pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "orkide123",
  database: "pilstellerdb",
  debug: false,
});

// Routes
// Users
const usersRoute = require("./routes/users");
const UsersDao = require("./dao/UsersDao.js");
app.use("/users", usersRoute);
app.set("usersdao", new UsersDao(pool));

const authRoute = require("./routes/auth");
const AuthDao = require("./dao/AuthDao");
app.use("/auth", authRoute);
app.set("authdao", new AuthDao(pool));

app.listen(port, () => console.log("Server started on port " + port));
