const vehicleLocationService = require('../services/vehicleLocationService');
const VehicleLocationDTO = require('../dtos/vehicleDTO');
const logger = require('../utils/logger');

class VehicleLocationController {
    async getVehicleById(req, res) {
        try {
            const { vehicleId } = req.params;
            const vehicle = await vehicleLocationService.getVehicleById(vehicleId);
            if (!vehicle) {
                res.status(404).json({ error: "Vehicle not found" });
                return;
            }
            const vehicleDTO = new VehicleLocationDTO(vehicle);
            res.status(200).json(vehicleDTO);
        } catch (error) {
            logger.error(`Error retrieving vehicle: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getVehicleByVendorId(req, res) {
        try {
            const { vendorId } = req.params;
            const vehicle = await vehicleLocationService.getVehicleByVendorId(vendorId);
            if (!vehicle) {
                res.status(404).json({ error: "Vehicle not found" });
                return;
            }
            const vehicleDTO = new VehicleLocationDTO(vehicle);
            res.status(200).json(vehicleDTO);
        } catch (error) {
            logger.error(`Error retrieving vehicle: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllVehicles(req, res) {
        try {
            const vehicles = await vehicleLocationService.getAllVehicles();
            const vehicleDTOs = vehicles.map(vehicle => new VehicleLocationDTO(vehicle));
            res.status(200).json(vehicleDTOs);
        } catch (error) {
            logger.error(`Error retrieving vehicle: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new VehicleLocationController();
