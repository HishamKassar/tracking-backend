const vehicleRepository = require('../repositories/vehicleRepository');
const logger = require('../utils/logger');

class VehicleService {

    async createVehicle(type, plate) {
        try {
            const vehicle = await vehicleRepository.createVehicle({ type, plate });
            logger.info(`Create vehicle: ${vehicle.id}`);
            return vehicle;
        } catch (error) {
            logger.error(`Error in create vehicle,  ${error.message}`);
            throw error;
        }
    }

    async getAllVehicles() {
        try {
            const vehicles = await vehicleRepository.getAllVehicles();
            logger.info(`All vehicles retrieved`);
            return vehicles;
        }
        catch {
            logger.error(`Error retrieving vehicles: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new VehicleService();
