const Dao = require("./dao.js");

module.exports = class AuthDao extends Dao{
  postUser(email, callback) {
    super.query(
      "INSERT INTO users(email, name) VALUES($1, $2) RETURNING *",
      email,
      callback
    );
  }

  /* checkUser(name, callback) {
    super.query("SELECT * FROM users WHERE name = $1", [name], callback);
  } */

  checkUser(email, callback) {
    super.query("SELECT * FROM users WHERE email = $1", [email], callback);
  }

};
