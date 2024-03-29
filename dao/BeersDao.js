const Dao = require("./dao.js");

module.exports = class BeersDao extends Dao {
  getBeers(callback) {
    super.query("SELECT * FROM beers", [], callback);
  }

  getWeeklyDrunkard(callback) {
    super.query(
      "SELECT sum(amount) AS count, name, image " +
        "FROM beers " +
        "INNER JOIN users ON beers.user_id=users.id " +
        "WHERE date_part('week', beers.reg_date) = date_part('week', CURRENT_DATE) " +
        "GROUP BY user_id, name, image " +
        "HAVING " +
        "sum(amount) = " +
        "(SELECT MAX(c) FROM ( " +
        "SELECT SUM(amount) AS c from beers " +
        "WHERE date_part('week', beers.reg_date) = date_part('week', CURRENT_DATE) " +
        "GROUP BY user_id) " +
        "AS t) " +
        "ORDER BY count DESC; ",
      [],
      callback
    );
  }

  getBeerSumPerUser(callback) {
    super.query(
      "SELECT sum(amount) AS count, NAME " +
        "FROM beers " +
        "INNER JOIN users ON beers.user_id=users.id " +
        "GROUP BY user_id, name, image " +
        "ORDER BY count DESC " +
        "LIMIT 10;",
      [],
      callback
    );
  }

  getGreatestContributor(callback) {
    super.query(
      "SELECT sum(amount) AS count, name, image FROM beers " +
        "INNER JOIN users ON beers.user_id=users.id " +
        "GROUP BY user_id, name, image " +
        "HAVING sum(amount) = ( " +
        "SELECT MAX(c) FROM ( " +
        "SELECT SUM(amount) AS c from beers " +
        "GROUP BY user_id) AS t) " +
        "ORDER BY count DESC;",
      [],
      callback
    );
  }

  postBeers(regInfo, callback) {
    super.query(
      "INSERT INTO beers(amount, reg_date, user_id, drink_type) VALUES($1, $2, $3, $4)",
      regInfo,
      callback
    );
  }

  getBeerOverTime(callback) {
    super.query(
      "SELECT SUM(amount) AS sum, CAST(reg_date AS DATE) AS date " +
        "FROM beers " +
        "GROUP BY CAST(reg_date AS DATE) " +
        "ORDER BY date;",
      [],
      callback
    );
  }
};
