const mongoose = require('mongoose');

const YearSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model('Year', YearSchema);

