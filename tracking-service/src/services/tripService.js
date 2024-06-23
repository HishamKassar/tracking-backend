const tripRepository = require('../repositories/tripRepository');
const logger = require('../utils/logger');

class TripService {

    async assignVehicleToVendor(vendorId, vehicleId, pickUpLocation, dropOffLocation) {
        try {
            const latestVendorTrip = await tripRepository.getLatestTripByVendor(vendorId);
            if (latestVendorTrip && latestVendorTrip.status != "finished") {
                logger.error(`Error in assign vehicle ${vehicleId} to vendor: ${vendorId},  driver already has another trip`);
                throw new Error('driver already has another trip');
            }
            const trip = await tripRepository.createTrip({vendorId, vehicleId, pickUpLocation, dropOffLocation});
            logger.info(`Assign vehicle: ${vehicleId} to the vendor: ${vendorId}`);
            return trip;
        } catch (error) {
            logger.error(`Error in assign vehicle ${vehicleId} to vendor: ${vendorId},  ${error.message}`);
            throw error;
        }
    }

    async updateTrip(tripId, vendorId, vehicleId, pickUpLocation, dropOffLocation) {
        try {
            const trip = await tripRepository.updateTrip(tripId, vendorId, vehicleId, pickUpLocation, dropOffLocation);
            logger.info(`Trip updated: ${trip.id}`);
            return trip;
        } catch (error) {
            logger.error(`Error updating trip: ${error.message}`);
            throw error;
        }
    }

    async updateTripStatus(tripId, status) {
        try {
            const trip = await tripRepository.updateTripStatus(tripId, status);
            logger.info(`Trip status updated: ${trip.id}`);
            return trip;
        } catch (error) {
            logger.error(`Error updating trip status: ${error.message}`);
            throw error;
        }
    }

    async getTripById(tripId) {
        try {
            const trip = await tripRepository.getTripById(tripId);
            logger.info(`Trip retrieved: ${tripId}`);
            return trip;
        } catch (error) {
            logger.error(`Error retrieving trip: ${error.message}`);
            throw error;
        }
    }

    async getAllTrips() {
        try {
            const trips = await tripRepository.getAllTrips();
            logger.info(`All trips retrieved`);
            return trips;
        }
        catch {
            logger.error(`Error retrieving trips: ${error.message}`);
            throw error;
        }
    }

    async getLatestActiveTripByVendor(vendorId) {
        try {
            const trip = await tripRepository.getLatestTripByVendor(vendorId);
            if (!trip) {
                return {};
            }
            if (trip.status == 'finished') {
                return {};
            }
            logger.info(`Get latest trip: ${trip.id} to the vendor: ${vendorId}`);
            return trip;
        } catch (error) {
            logger.error(`Error in get latest trip for vendor: ${vendorId},  ${error.message}`);
            throw error;
        }
    }
}

module.exports = new TripService();
