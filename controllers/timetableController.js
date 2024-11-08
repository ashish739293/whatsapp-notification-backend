const Timetable = require('../models/Timetable');
const Branch = require('../models/Branch');
const Year = require('../models/Year');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const Classroom = require('../models/Classroom');


exports.addTimetableEntry = async (req, res) => {
    try {
        const newTimetable = new Timetable(req.body);
        await newTimetable.save();
        res.status(201).json(newTimetable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllTimetables = async (req, res) => {
    try {
        // Find all timetables without any conditions
        const timetables = await Timetable.find()
            .populate('subject')  // Populate the subject field
            .populate('teacher')  // Populate the teacher field
            .populate('classroom') // Populate the classroom field
            // .populate('branch') // Populate the classroom field
            .populate('branch year'); // Populate the classroom field


        // Check if timetable data is found
        if (!timetables || timetables.length === 0) {
            return res.status(404).json({ message: 'No timetables found.' });
        }

        // Return the populated timetable data
        res.json(timetables);
    } catch (error) {
        // Return error message with status 500 if any error occurs during query
        console.error(error.message);
        res.status(500).json({ message: 'Server error, unable to retrieve timetable data.' });
    }
};

exports.getAllTimetableData = async (req, res) => {
    try {
        // Fetch all collections data
        const branches = await Branch.find();
        const years = await Year.find();
        const subjects = await Subject.find().populate('branch year');
        const teachers = await Teacher.find().populate('subject');
        const classrooms = await Classroom.find();
    
        // Sending all data as a single response
        res.json({
          branches,
          years,
          subjects,
          teachers,
          classrooms
        });
      } catch (error) {
        console.error('Error fetching timetable data:', error);
        res.status(500).json({ message: 'Error fetching data' });
      }
};

