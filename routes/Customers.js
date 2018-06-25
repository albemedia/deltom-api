const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const customers = require("../models/customers");

const CustomerController = require("../controllers/Customers");
const Customer = new CustomerController();

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

//List all customers
router.get("/", function(req, res) {
  Customer.list().then(result => {
    res.json(result);
  });
});

//List one customers
router.get("/:id", function(req, res) {
  customers.find({ cuit: req.params.id }).exec((err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      res.json(result);
    }
  });
});

//Create a new customer
router.post("/", function(req, res) {
  Customer.create(req.body).then(response => {
    res.send(response);
  });
  /*
  customers.create(req.body, (err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err,
        response: {
          status: "error",
          msg:
            "Hubo un error al intentar registrar a este cliente, por favor verifique la informacion"
        }
      });
    } else {
      res.json({
        success: true,
        response: { status: "ok", msg: "Cliente Registrado!" }
      });
    }
  });
  */
});

//Add Customer Address
router.post("/newaddress/:id", function(req, res) {
  customers.findOne({ cuit: req.params.id }, (err, result) => {
    if (err) {
      res.json({
        success: false,
        response: {
          status: "error",
          msg: "Hubo un error al registrar esta direccion"
        }
      });
    } else {
      result.addresses.push(req.body);
      result.save(err => {
        if (err) {
          res.status(500).send({
            success: false,
            error: err,
            response: {
              status: "error",
              msg: "Hubo un error al registrar esta direccion"
            }
          });
        }
        res.status(200);
        res.json({
          success: true,
          response: {
            status: "ok",
            msg: "Direccion agregada!"
          }
        });
      });
    }
  });
});

//Update a customer
router.put("/:id", function(req, res) {
  customers.findOne({ cuit: req.params.id }, (err, result) => {
    if (err) {
      res.json({
        success: false
      });
    } else {
      console.log(req.body);
      result.name = req.body.name || result.name;
      result.lastName = req.body.lastName || result.lastName;
      result.company = req.body.company || result.company;
      result.email = req.body.email || result.email;
      result.tlf = req.body.tlf || result.tlf;
      result.mobile = req.body.mobile || result.mobile;
      result.save(err => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200);
        res.json({
          success: true
        });
      });
    }
  });
});

//Delete a Customer
router.delete("/:id", (req, res) => {
  console.log("DELETE ITEM");
  customers.findOneAndRemove({ cuit: req.params.id }, err => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200);
    res.json({
      success: true
    });
  });
});

module.exports = router;
