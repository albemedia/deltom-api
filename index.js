const express = require("express");
const app = express();
const chalk = require("chalk");
const BodyParser = require("body-parser");
const environment = !process.env.NODE_ENV
  ? "development"
  : process.env.NODE_ENV;
const dotenv = require("dotenv").config({
  path: `${__dirname}/env/.env.${environment}`
});
const DbConnect = require("./db");

//Database Connection
DbConnect();

//Routes
const Customers = require("./routes/Customers");
const Products = require("./routes/Products");

//Middlewares
app.use("/api/customers", Customers);
app.use("/api/products", Products);
app.use(BodyParser.urlencoded({ extended: true }));

//Index Page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

//Run Server
const port = process.env.PORT;
app.listen(port, err => {
  if (err) {
    console.log(chalk.red(err));
  } else {
    console.log(chalk.green(`Server Started: Listening on port ${port}...`));
  }
});
