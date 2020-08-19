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
        "WHERE YEARWEEK(beers.reg_date, 1) = YEARWEEK(NOW(), 1) " +
        "GROUP BY user_id " +
        "HAVING count = (" +
        "SELECT MAX(c) FROM (" +
        "SELECT SUM(amount) AS c from beers " +
        "WHERE YEARWEEK(beers.reg_date, 1) = YEARWEEK(NOW(), 1) " +
        "GROUP BY user_id) AS t) " +
        "ORDER BY count DESC;",
      [],
      callback
    );
  }

  getBeerSumPerUser(callback) {
    super.query(
      "SELECT sum(amount) AS count, NAME " +
        "FROM beers " +
        "INNER JOIN users ON beers.user_id=users.id " +
        "GROUP BY user_id " +
        "ORDER BY count DESC;",
      [],
      callback
    );
  }

  postBeers(beers, callback) {
    console.log("Posting beers...");
    super.query(
      "INSERT INTO beers(amount, user_id) VALUES(?, ?)",
      beers,
      callback
    );
  }

  getBeerOverTime(callback) {
    console.log("Getting beers over time...");
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
