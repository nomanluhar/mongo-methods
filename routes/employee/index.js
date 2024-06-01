// employee/index.js

const express = require("express");
const router = express.Router();

// Import route files
const createRoute = require("./create.js");
const deleteRoute = require("./delete.js");

const verifyToken = require("../../middleware/authMiddleware.js");

// Configure routes
router.use("/add", verifyToken, createRoute);
router.use("/remove", verifyToken, deleteRoute);
module.exports = router;
