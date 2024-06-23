const vehicleService = require('../services/vehicleService');
const VehicleDTO = require('../dtos/vehicleDTO');
const logger = require('../utils/logger');

class VehicleController {
    async createVehicle(req, res) {
        try {
            const { type, plate } = req.body;
            await vehicleService.createVehicle(type, plate);
            res.status(200).json({});
        } catch (error) {
            logger.error(`Error creating vehicle: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllVehicles(req, res) {
        try {
            const vehicles = await vehicleService.getAllVehicles();
            const vehiclesDTOs = vehicles.map(vehicle => new VehicleDTO(vehicle));
            res.status(200).json(vehiclesDTOs);
        } catch (error) {
            logger.error(`Error retrieving vehicles: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new VehicleController();
