const Dao = require("./dao.js");

module.exports = class AuthDao extends Dao {
  postUser(user, callback) {
    super.query(
      "INSERT INTO users(name, password) VALUES(?, ?)",
      user,
      callback
    );
  }

  checkUser(name, callback) {
    super.query("SELECT * FROM users WHERE name = ?", [name], callback);
  }
};
