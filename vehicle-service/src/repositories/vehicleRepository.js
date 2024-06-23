const VehicleModel = require('../models/vehicleModel');

class VehicleRepository {

    async createVehicle(vehicleData) {
        const vehicle = new VehicleModel(vehicleData);
        return await vehicle.save();
    }
    
    async getAllVehicles() {
        return await VehicleModel.find();
    }
}

module.exports = new VehicleRepository();
