const Dao = require("./dao.js");

module.exports = class UsersDao extends Dao {
  getUsers(callback) {
    super.query("SELECT * FROM users", [], callback);
  }

  // This method can find users, based on eiter id or name
  getUser(name, callback) {
    super.query("SELECT * from users WHERE name = ?", name, callback);
  }
};
