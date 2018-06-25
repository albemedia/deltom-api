const Base = require("./Base");
const Models = require("../models");

class Customer extends Base {
  constructor() {
    super("cuit", Models.Customers);
  }
}

module.exports = Customer;
