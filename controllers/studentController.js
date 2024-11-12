const Student = require('../models/student');

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { rollNo, name, mobile, email, year, branch, status } = req.body;

    // Validate required fields
    if (!rollNo || !name || !mobile || !email || !year || !branch || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newStudent = new Student({ rollNo, name, mobile, email, year, branch, status });

    // Save the student to the database
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating student' });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching students' });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching student' });
  }
};

// Update student information
const updateStudent = async (req, res) => {
  const { rollNo, name, mobile, email, year, branch, status } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { rollNo, name, mobile, email, year, branch, status },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error updating student' });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting student' });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
