const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");

router.delete("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the employee by email and remove it
    const deletedEmployee = await Employee.findOneAndDelete({ email });

    if (deletedEmployee) {
      res.status(200).json({
        message: "Employee deleted successfully",
        employee: deletedEmployee,
      });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

// Route to remove all employee data
router.delete("/bulk", async (req, res) => {
  try {
    // Delete all employee data from the database
    const deletedEmployees = await Employee.deleteMany();

    if (deletedEmployees.deletedCount > 0) {
      res
        .status(200)
        .json({
          message: "All employee data deleted successfully",
          count: deletedEmployees.deletedCount,
        });
    } else {
      res.status(404).json({ error: "No employee data found to delete" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete employee data" });
  }
});

module.exports = router;
