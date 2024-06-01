const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");

// Route to get all employee data
router.get("/", async (req, res) => {
  try {
    // Find all employee data from the database
    const employees = await Employee.find();
    // Get the total number of documents in the Employee collection
    // const totalCount = await Employee.countDocuments();

    const responseObj = {
      length: employees.length,
      employees,
    };

    if (employees.length > 0) {
      res.status(200).json({ responseObj });
    } else {
      res.status(404).json({ error: "No employee data found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get employee data" });
  }
});

// Route to get a single employee by email or other keywords
router.get("/:key", async (req, res) => {
  try {
    const { key } = req.params;

    // Check if the key is an email address
    const isEmail = key.includes("@");

    // Define the query object based on the provided key
    const query = isEmail ? { email: key } : { $text: { $search: key } };

    // Find the employee by email or other keywords
    const employee = await Employee.findOne(query);

    if (employee) {
      res.status(200).json({ employee });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get employee data" });
  }
});

module.exports = router;
