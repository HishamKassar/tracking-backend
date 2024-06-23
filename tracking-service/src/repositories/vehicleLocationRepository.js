const VehicleLocation = require('../models/vehicleLocationModel');

class VehicleLocationRepository {

    async createOrUpdateVehicleLocation(tripId, vendorId, vehicleId, location) {
        return await VehicleLocation.findOneAndUpdate(
            { tripId },
            { vendorId, vehicleId, currentLocation: location, status: 'online' },
            { new: true, upsert: true }
        )
    }

    async updateVehicleStatus(tripId, status) {
        return await VehicleLocation.findOneAndUpdate(
            { tripId },
            { status },
            { new: true }
        );
    }

    async getVehicleById(vehicleId) {
        return await VehicleLocation.findOne({ vehicleId });
    }

    async getVehicleByVendorId(vendorId) {
        return await VehicleLocation.findOne({ vendorId }).sort({ createdAt: -1 });
    }

    async updateVehicleStatusByLatestVendorId(vendorId, status) {
        return await VehicleLocation.findOneAndUpdate(
            { vendorId },
            { status },
            { new: true }
        ).sort({ createdAt: -1 });
    }

    async getAllVehicles() {
        const allLocations = await VehicleLocation.find({ status: { $ne: 'closed' } }).sort({ createdAt: -1 });

        const latestActions = new Map();
        allLocations.forEach(location => {
            if (!latestActions.has(location.vendorId)) {
                latestActions.set(location.vendorId, location);
            }
        });
        
        const result = Array.from(latestActions.values());
        return result;
    }
}

module.exports = new VehicleLocationRepository();
