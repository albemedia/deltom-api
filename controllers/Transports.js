const Base = require("./Base");
const Models = require("../models");

class Transports extends Base {
  constructor() {
    super("_id", Models.Transports);
  }
}

module.exports = Transports;
