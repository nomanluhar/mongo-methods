const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");
const employeeData = require("../../employee-data.json"); // Path to your JSON file

//Add employee
router.post("/", async (req, res) => {
  try {
    // Check if an employee with the given email already exists
    const existingEmployee = await Employee.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ error: "Employee with this email already exists" });
    }

    const user = new Employee(req.body);
    await user.save();
    res.status(201).json("Created successfully");
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: "Employee creation failed" });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    // Find existing employees with the same emails
    const existingEmployees = await Employee.find({
      email: { $in: employeeData.map((employee) => employee.email) },
    });

    // Extract existing email addresses
    const existingEmails = existingEmployees.map((employee) => employee.email);

    // Filter out employees with duplicate emails
    const newData = employeeData.filter(
      (employee) => !existingEmails.includes(employee.email)
    );
    const duplicates = employeeData.filter((employee) =>
      existingEmails.includes(employee.email)
    );

    if (newData.length > 0) {
      // Insert only new data into the database
      await Employee.insertMany(newData);
    }

    res.status(201).json({
      message: "Import operation completed",
      duplicates: duplicates,
    });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: "Employee creation failed" });
  }
});

module.exports = router;
