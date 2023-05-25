const { Customer, validateCustomer } = require("../models/customer_model");
const express = require("express");
const customerRoutes = express.Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/asyncMiddleware");

customerRoutes.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const customer = await Customer.find();
    res.send(customer);
  })
);

customerRoutes.post(
  "/",
  asyncMiddleware(async (req, res) => {
    console.log(req.body);
    const result = validateCustomer(req.body);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }

    const customer = new Customer({
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    });

    try {
      const newCustomer = await customer.save();
      res.send(newCustomer);
    } catch (err) {
      res.status(400).send(err.message);
    }
  })
);

customerRoutes.put(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const result = validateCustomer(req.body);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone,
      },
      { new: true }
    );

    if (!customer) {
      res.status(404).send("404 not found");
      return;
    }
    res.send(customer);
  })
);

customerRoutes.delete(
  "/:id",
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      res.status(404).send("404 not found");
      return;
    }
    res.send(customer);
  })
);

module.exports = customerRoutes;
