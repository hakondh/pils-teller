const Dao = require("./dao.js");

module.exports = class AuthDao extends Dao {
  postUser(user, callback) {
    console.log("Posting user...");
    super.query(
      "INSERT INTO users(name, password) VALUES(?, ?)",
      user,
      callback
    );
  }

  checkUser(name, callback) {
    console.log("Checking user....");
    super.query("SELECT * FROM users WHERE name = ?", [name], callback);
  }
};
