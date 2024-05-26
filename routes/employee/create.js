const express = require("express");
const router = express.Router();
// const User = require("../models/Employee");

//Add employee
router.post("/", (req, res) => {
  console.log("Employee create function call-");

  res.status(200).json("Created successfully");
});

module.exports = router;
