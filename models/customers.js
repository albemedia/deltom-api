var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CustomerSchema = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    company: { type: String },
    cuit: { type: String, required: true },
    email: { type: String },
    tlf: { type: String },
    mobile: { type: String },
    addresses: { type: Array }
  },
  {
    timestamps: true
  }
);

//Export model
module.exports = mongoose.model("Customers", CustomerSchema);
