const Dao = require("./dao.js");

module.exports = class UsersDao extends Dao {
  getUsers(callback) {
    super.query("SELECT * FROM users", [], callback);
  }

  // This method can find users, based on eiter id or name
  getUser(name, callback) {
    super.query("SELECT * from users WHERE name = ?", name, callback);
  }

  // Adds or updates the image of a user
  putImage(arr, callback) {
    super.query("UPDATE users SET image = ? WHERE name = ?", arr, callback);
  }

  getUserBeers(id, callback) {
    super.query(
      "SELECT SUM(amount) AS sum FROM beers WHERE user_id = ?",
      [id],
      callback
    );
  }
};
