const Dao = require("./dao.js");

module.exports = class AuthDao extends Dao{
  postUser(user, callback) {
    super.query(
      "INSERT INTO users(name, password) VALUES($1, $2)",
      user,
      callback
    );
  }

  checkUser(name, callback) {
    super.query("SELECT * FROM users WHERE name = $1", [name], callback);
  }
};
