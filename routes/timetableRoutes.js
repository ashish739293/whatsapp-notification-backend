const express = require('express');
const router = express.Router();
// const timetableController = require('../controllers/timetableController');
const { getAllTimetables ,addTimetableEntry ,getAllTimetableData } = require('../controllers/timetableController');

// Add a new timetable entry
router.post('/add', addTimetableEntry);

// Get the timetable for a branch and year
router.get('/getSaveTimeTables', getAllTimetables);

router.get('/getAllData', getAllTimetableData);

module.exports = router;

