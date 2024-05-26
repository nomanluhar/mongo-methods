// employee/index.js

const express = require("express");
const router = express.Router();

// Import route files
const createRoute = require("./create.js");
const verifyToken = require("../../middleware/authMiddleware.js");

// Configure routes
router.use("/add", verifyToken, createRoute);
module.exports = router;
