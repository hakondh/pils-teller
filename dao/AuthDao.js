const Dao = require("./dao.js");

module.exports = class AuthDao extends Dao{
  postUser(email, callback) {
    console.log(email)
    super.query(
      "INSERT INTO users(email) VALUES($1)",
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
