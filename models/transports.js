var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TransportSchema = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    addresses: { type: Array }
  },
  {
    timestamps: true
  }
);

//Export model
module.exports = mongoose.model("Transports", TransportSchema);
