const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model('Teacher', TeacherSchema);

