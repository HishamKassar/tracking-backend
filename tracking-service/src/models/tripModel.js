const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    vendorId: { type: String, required: true },
    vehicleId: { type: String, required: true },
    pickUpLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    dropOffLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    status: { type: String, enum: ['idle', 'started', 'finished'], default: 'idle' },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
