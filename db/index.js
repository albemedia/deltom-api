const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("../config/config");

function connect() {
  const user = config.db_user;
  const pass = config.db_pass;
  const url = config.db_url;

  const connect_string = `mongodb://${user}:${pass}${url}`;

  /*
  if (mongoose.connect(connect_string)) {
    console.log(chalk.white("Attemp connection to ", chalk.blue(url)));
  }
  */

  mongoose
    .connect(connect_string)
    .then(() => {
      console.log(chalk.white("Attemp connection to ", chalk.blue(url)));
    })
    .catch(error => {
      console.log(error);
    });

  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on("connected", () => console.log(chalk.green("Connected to Database")));
  db.on(
    "error",
    console.error.bind(console, chalk.red("MongoDB connection error:"))
  );
}

module.exports = connect;
