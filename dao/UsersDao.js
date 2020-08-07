const Dao = require("./dao.js");

module.exports = class UsersDao extends Dao {
  postUser(user, callback) {
    super.query(
      "INSERT INTO users(name, password) VALUES(?, ?)",
      user,
      callback
    );
  }

  getUsers(callback) {
    super.query("SELECT * FROM users", [], callback);
  }

  // This method can find users, based on eiter id or name
  getUsers(identificator, callback) {
    super.query("SELECT * from user WHERE name = ?", name, callback);
  }

  loginUsers(user, callback) {
    super.query();
  }
};
