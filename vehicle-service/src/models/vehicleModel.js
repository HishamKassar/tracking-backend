const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    type: { type: String, required: true },
    plate: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
