const express = require('express');
const router = express.Router();
// const timetableController = require('../controllers/timetableController');
const { getAllTimetables ,addTimetableEntry ,getAllTimetableData ,editTimetableEntry,deleteTimetableEntry } = require('../controllers/timetableController');
const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
  } = require('../controllers/studentController');


// Add a new timetable entry
router.post('/add_time', addTimetableEntry);

router.post('/edit_time', editTimetableEntry);

router.delete('/deleteTimeTable/:id', deleteTimetableEntry);

// Get the timetable for a branch and year
router.get('/getSaveTimeTables', getAllTimetables);

router.get('/getAllData', getAllTimetableData);



// Route for creating a student
router.post('/students', createStudent);

// Route for getting all students
router.get('/students', getAllStudents);

// Route for getting a student by ID
router.get('/students/:id', getStudentById);

// Route for updating a student by ID
router.put('/students/:id', updateStudent);

// Route for deleting a student by ID
router.delete('/students/:id', deleteStudent);

module.exports = router;

