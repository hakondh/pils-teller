const Dao = require("./dao.js");

module.exports = class UsersDao extends Dao {
  getUsers(callback) {
    super.query("SELECT * FROM users", [], callback);
  }

  // This method can find users, based on eiter id or name
  getUser(name, callback) {
    super.query("SELECT * from users WHERE name = $1", name, callback);
  }

  // Adds or updates the image of a user
  putImage(arr, callback) {
    super.query("UPDATE users SET image = $1 WHERE id = $2", arr, callback);
  }

  getUserBeers(id, callback) {
    super.query(
      "SELECT SUM(amount) AS sum FROM beers WHERE user_id = $1",
      [id],
      callback
    );
  }

  getUserImage(id, callback) {
    super.query("SELECT image FROM users WHERE id = $1", [id], callback);
  }
};
