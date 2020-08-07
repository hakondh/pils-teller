const express = require("express");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const port = 5000;

app.use(express.json());
// Allow access to XMLHttpRequest (fix block by CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  next();
});

// Setting up the connection pool
let pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "orkide123",
  database: "pilstellerdb",
  debug: false,
});

// Get the daos for requests
const UsersDao = require("./dao/UsersDao.js");
const usersdao = new UsersDao(pool);

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    usersdao.postUser([req.body.name, hashedPassword], (status, data) => {
      res.status(status);
    });
  } catch {
    res.status(500);
  }
});

app.get("/users", (req, res) => {
  usersdao.getUsers((status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.get("/users/:name", (req, res) => {
  usersdao.getUser();
});

app.post("/users/login", async (req, res) => {
  // Handle login
});

app.listen(port, () => console.log("Server started on port " + port));
