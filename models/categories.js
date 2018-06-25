var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
  description: { type: String, required: true },
  parent: { type: String, default: "0" }
});

//Export model
module.exports = mongoose.model("Categories", CategoriesSchema);
