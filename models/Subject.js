const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    year: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true },
});

module.exports = mongoose.model('Subject', SubjectSchema);

