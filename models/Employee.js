const mongoose = require('mongoose');

// Define the schema for employee details
const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    hireDate: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    skills: [String],
    projects: [
        {
            projectName: String,
            startDate: Date,
            endDate: Date,
            technologies: [String]
        }
    ]
});

// Create a text index on the fields you want to query with $text
employeeSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
