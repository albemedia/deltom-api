const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const CategoriesController = require("../controllers/Categories");
const Category = new CategoriesController();

//Use BodyParser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Fix CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

//List Categories
router.get("/categories", function(req, res) {
  Category.list().then(result => {
    res.status(200);
    res.json(result);
  });
});

//Create a Category
router.post("/categories", function(req, res) {
  Category.create(req.body).then(response => {
    res.send(response);
  });
});

//Delete a Category
router.get("/categories/delete/:id", (req, res) => {
  Category.delete({ _id: req.params.id })
    .then(response => {
      if (response.status === "ok") {
        res.status(200).send(response);
      } else {
        res.status(500).send(response);
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
