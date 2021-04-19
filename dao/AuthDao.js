const Dao = require("./dao.js");

module.exports = class AuthDao extends Dao{
  postUser(user, callback) {
    super.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
      user,
      callback
    );
  }

  /* checkUser(name, callback) {
    super.query("SELECT * FROM users WHERE name = $1", [name], callback);
  } */

  checkUserEmail(email, callback) {
    super.query("SELECT * FROM users WHERE email = $1", [email], callback);
  }
  
  checkUserName(name, callback) {
    super.query("SELECT * FROM users WHERE name = $1", [name], callback);
  }

};
