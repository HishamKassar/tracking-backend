const mongoose = require('mongoose');

const vehicleLocationSchema = new mongoose.Schema({
    tripId: { type: String, required: true, unique: true },
    vendorId: { type: String, required: true },
    vehicleId: { type: String, required: true },
    currentLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    status: { type: String, enum: ['online', 'offline', 'closed'], default: 'offline' },
}, { timestamps: true });

module.exports = mongoose.model('VehicleLocation', vehicleLocationSchema);
