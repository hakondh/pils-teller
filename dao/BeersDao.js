const Dao = require("./dao.js");

module.exports = class BeersDao extends Dao {
  postBeers(beers, callback) {
    console.log("Posting beers...");
    super.query(
      "INSERT INTO beers(amount, user_id) VALUES(?, ?)",
      beers,
      callback
    );
  }
};
