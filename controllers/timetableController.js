const Timetable = require('../models/Timetable');
const Branch = require('../models/Branch');
const Year = require('../models/Year');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const Classroom = require('../models/Classroom');


exports.deleteTimetableEntry = async (req, res) => {
    const { id } = req.params;
    console.log("<><><><><><>",id);
    try {
        // Find the timetable entry by ID and delete it
        const deletedTimetable = await Timetable.findByIdAndDelete(id);

        if (!deletedTimetable) {
            return res.status(404).json({ message: 'Timetable entry not found' });
        }

        return res.status(200).json({ message: 'Timetable entry deleted successfully', deletedTimetable });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
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


// Helper function for validation
const validateRequestBody = (body) => {
    const requiredFields = [
        'subject',
        'teacher',
        'classroom',
        'branch',
        'year',
        'startTime',
        'endTime',
        'day'
    ];
    for (const field of requiredFields) {
        if (!body[field]) {
            return `Missing required field: ${field}`;
        }
    }
    return null;
};

// Store (Add) API
exports.addTimetableEntry = async (req, res) => {
    try {
        const validationError = validateRequestBody(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        console.log("<><><><><><data><><><>",req.body);
        const newTimetable = new Timetable(req.body);
        await newTimetable.save();
        const populatedTimetable = await newTimetable
            .populate('subject')
            .populate('teacher')
            .populate('classroom')
            .populate('branch')
            .populate('year')
            .execPopulate();

        res.status(201).json(populatedTimetable);
    } catch (error) {
        console.error('Error adding timetable entry:', error.message);
        res.status(500).json({ message: 'Error adding timetable entry' });
    }
};

// Edit API
exports.editTimetableEntry = async (req, res) => {
    try {
        const { _id } = req.body;
        const validationError = validateRequestBody(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        console.log("><><_id><><<>",_id)

        const updatedTimetable = await Timetable.findByIdAndUpdate(_id, req.body, {
            new: true, // Return the updated document
            runValidators: false // Ensure validation rules are applied
        })
            .populate('subject')
            .populate('teacher')
            .populate('classroom')
            .populate('branch')
            .populate('year');

            console.log("><><><><<>",updatedTimetable)
        if (!updatedTimetable) {
            return res.status(404).json({ message: 'Timetable entry not found' });
        }

        res.json(updatedTimetable);
    } catch (error) {
        console.error('Error updating timetable entry:', error.message);
        res.status(500).json({ message: 'Error updating timetable entry' });
    }

};