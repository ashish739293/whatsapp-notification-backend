const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
});

module.exports = mongoose.model('Classroom', ClassroomSchema);

