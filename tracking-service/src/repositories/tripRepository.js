const Trip = require('../models/tripModel');

class TripRepository {

    async createTrip(tripData) {
        const trip = new Trip(tripData);
        return await trip.save();
    }

    async updateTrip(tripId, vendorId, vehicleId, pickUpLocation, dropOffLocation) {
        return await Trip.findOneAndUpdate(
            { _id: tripId },
            { vendorId, vehicleId, pickUpLocation, dropOffLocation },
            { new: true }
        );
    }

    async updateTripStatus(tripId, status) {
        return await Trip.findOneAndUpdate(
            { _id: tripId },
            { status },
            { new: true }
        );
    }

    async getLatestTripByVendor(vendorId) {
        return await Trip.findOne({ vendorId }).sort({ createdAt: -1 });
    }

    async getTripById(tripId) {
        return await Trip.findById(tripId);
    }

    async getAllTrips() {
        return await Trip.find();
    }
}

module.exports = new TripRepository();
