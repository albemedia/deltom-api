const Base = require("./Base");
const Models = require("../models");

class Categories extends Base {
  constructor() {
    super("_id", Models.Categories);
  }
}

module.exports = Categories;
