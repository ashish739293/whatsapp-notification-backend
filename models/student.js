const mongoose = require('mongoose');

// Define the schema for student data
const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true, length: 10 },
  email: { type: String, required: true, unique: true },
  year: { type: String, required: true },
  branch: { type: String, required: true },
  status: { type: String, required: true }
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
