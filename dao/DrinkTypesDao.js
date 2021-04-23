const Dao = require("./dao.js");

module.exports = class DrinkTypesDao extends Dao {
  getDrinkTypes(callback) {
    super.query("SELECT * FROM drink_types", [], callback);
  }

  getDrinkTypesCount(callback) {
    super.query(
      "select drink_types.name, sum(beers.amount) as count " +
        "from drink_types " +
        "join beers on drink_types.id = beers.drink_type " +
        "group by drink_types.id, drink_types.name",
      [],
      callback
    );
  }
};
