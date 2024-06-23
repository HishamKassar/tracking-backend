const vehicleLocationRepository = require('../repositories/vehicleLocationRepository');
const logger = require('../utils/logger');

class VehicleLocationService {

    async updateVehicleLocation(tripId, vendorId, vehicleId, location) {
        try {
            const vehicle = await vehicleLocationRepository.createOrUpdateVehicleLocation(tripId, vendorId, vehicleId, location);
            logger.info(`Vehicle location updated: ${vehicle.vehicleId}`);
            return vehicle;
        } catch (error) {
            logger.error(`Error updating vehicle location: ${error.message}`);
            throw error;
        }
    }

    async updateVehicleStatus(tripId, status) {
        try {
            const vehicle = await vehicleLocationRepository.updateVehicleStatus(tripId, status);
            logger.info(`Vehicle status updated: ${vehicle.vehicleId}`);
            return vehicle;
        } catch (error) {
            logger.error(`Error updating vehicle status: ${error.message}`);
            throw error;
        }
    }

    async getVehicleById(vehicleId) {
        try {
            const vehicle = await vehicleLocationRepository.getVehicleById(vehicleId);
            logger.info(`Vehicle retrieved: ${vehicleId}`);
            return vehicle;
        } catch (error) {
            logger.error(`Error retrieving vehicle: ${error.message}`);
            throw error;
        }
    }

    async getVehicleByVendorId(vendorId) {
        try {
            const vehicle = await vehicleLocationRepository.getVehicleByVendorId(vendorId);
            if (vehicle) {
                logger.info(`Vehicle retrieved: ${vehicle.id}`);
            }
            return vehicle;
        } catch (error) {
            logger.error(`Error retrieving vehicle: ${error.message}`);
            throw error;
        }
    }

    async updateVehicleStatusByLatestVendorId(vendorId, status) {
        try {
            const vehicle = await vehicleLocationRepository.updateVehicleStatusByLatestVendorId(vendorId, status);
            if (vehicle) {
                logger.info(`Vehicle retrieved: ${vehicle.id}`);
            }
            return vehicle;
        } catch (error) {
            logger.error(`Error retrieving vehicle: ${error.message}`);
            throw error;
        }
    }

    async getAllVehicles() {
        try {
            const vehicles = await vehicleLocationRepository.getAllVehicles();
            logger.info(`All vehicles retrieved`);
            return vehicles;
        }
        catch {
            logger.error(`Error retrieving vehicle: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new VehicleLocationService();
