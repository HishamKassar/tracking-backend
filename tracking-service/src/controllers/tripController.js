const tripService = require('../services/tripService');
const TripDTO = require('../dtos/tripDTO');
const logger = require('../utils/logger');
const { verifyToken } = require('shared/utils/jwt');

class VehicleLocationController {
    async createTrip(req, res) {
        try {
            const { vendorId, vehicleId, pickUpLocation, dropOffLocation } = req.body;
            await tripService.assignVehicleToVendor(vendorId, vehicleId, pickUpLocation, dropOffLocation );
            res.status(200).json({});
        } catch (error) {
            logger.error(`Error creating trip: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateTrip(req, res) {
        try {
            const { tripId } = req.params;
            const { vendorId, vehicleId, pickUpLocation, dropOffLocation } = req.body;
            const oldTrip = await tripService.getTripById(tripId);
            if (!oldTrip) {
                res.status(404).json({ error: "Trip not found" });
                return;
            }
            await tripService.updateTrip(tripId, vendorId, vehicleId, pickUpLocation, dropOffLocation);
            res.status(200).json({});
        } catch (error) {
            logger.error(`Error update trip: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateTripStatus(req, res) {
        try {
            const { tripId } = req.params;
            const { status } = req.body;
            const oldTrip = await tripService.getTripById(tripId);
            if (!oldTrip) {
                res.status(404).json({ error: "Trip not found" });
                return;
            }
            await tripService.updateTripStatus(tripId, status);
            res.status(200).json({});
        } catch (error) {
            logger.error(`Error update trip: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getTripById(req, res) {
        try {
            const { tripId } = req.params;
            const trip = await tripService.getTripById(tripId);
            if (!trip) {
                res.status(404).json({ error: "Trip not found" });
                return;
            }
            const tripDTO = new TripDTO(trip);
            res.status(200).json(tripDTO);
        } catch (error) {
            logger.error(`Error retrieving trip: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getVendorActiveTrip(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                res.status(401).json({ error: "Unuthorized" });
                return;
            }
            const user = verifyToken(token);
            const trip = await tripService.getLatestActiveTripByVendor(user.id);
            const tripDTO = new TripDTO(trip);
            res.status(200).json(tripDTO);
        } catch (error) {
            logger.error(`Error retrieving trip: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllTrips(req, res) {
        try {
            const trips = await tripService.getAllTrips();
            const tripDTOs = trips.map(trip => new TripDTO(trip));
            res.status(200).json(tripDTOs);
        } catch (error) {
            logger.error(`Error retrieving trips: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new VehicleLocationController();
