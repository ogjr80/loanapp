const express = require("express");
const Customer = require("./models/Customer");
const Loan = require("./models/Loan");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/testdb", function() {
  console.log("database connection successful");
});

// build the express application
const app = express();

//express app middlware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get  for customers
app.get("/customer", function(req, res) {
  return Customer.find()
    .populate("loans")
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      throw err;
    });
});

//get Loan
app.get("/loan", function(req, res) {
  return Loan.find({})
    .then(loans => {
      return res.json(loans);
    })
    .catch(err => {
      throw err;
    });
});

//post for Customers
app.post("/customer", function(req, res) {
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email
  });

  return customer.save().then(result => {
    return console.log(customer);
  });
});

//post route for Loans
app.post("/loan", async function(req, res) {
  //let customerdetails = {};

  const loan = new Loan({
    name: req.body.name,
    customer: req.body.customer,
    amount: req.body.amount,
    term: req.body.term
  });

  const customer = await Customer.findById(req.body.customer);
  if (!customer) {
    throw new Error("Customer not found");
  }

  customer.loans.push(loan);

  await customer.save();

  return loan.save().then(result => {
    return res.json(loan);
  });
});

app.listen(3000, function() {
  console.log("server running on port 3000");
});
