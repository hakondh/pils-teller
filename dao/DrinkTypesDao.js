const Dao = require("./dao.js");

module.exports = class DrinkTypesDao extends Dao {
  getDrinkTypes(callback) {
    super.query("SELECT * FROM drink_types", [], callback);
  }
};
