const socketIo = require('socket.io');
const { verifyToken } = require('shared/utils/jwt');
const logger = require('./utils/logger');
const vehicleLocationService = require('./services/vehicleLocationService');
const tripRepository = require('./repositories/tripRepository');
const VehicleLocationDTO = require('./dtos/vehicleDTO');

const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*",
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.query.access_token;
        if (!token) {
            return next(new Error('Authentication error'));
        }
        try {
            const user = verifyToken(token);
            socket.user = user;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        logger.info(`New client connected: ${socket.id}, User: ${socket.user.username}`);

        if (socket.user.role === 'admin') {
            socket.join('admins');
        }

        socket.on('updateLocation', async (data) => {
            try {
                const { tripId, vehicleId, location } = data;
                const vehicle = await vehicleLocationService.updateVehicleLocation(tripId, socket.user.id, vehicleId, location);
                const vehicleDTO = new VehicleLocationDTO(vehicle);
                io.to('admins').emit('locationUpdate', vehicleDTO);
            } catch (error) {
                logger.error(`Error updating vehicle location: ${error.message}`);
            }
        });

        socket.on('updateFinishedStatus', async (data) => {
            try {
                const vehicle = await vehicleLocationService.updateVehicleStatusByLatestVendorId(socket.user.id, 'closed');
                const vehicleDTO = new VehicleLocationDTO(vehicle);
                io.to('admins').emit('locationUpdate', vehicleDTO);
            } catch (error) {
                logger.error(`Error updating vehicle location: ${error.message}`);
            }
        });

        socket.on('disconnect', async () => {
            const lastTrip = await tripRepository.getLatestTripByVendor(socket.user.id);
            if (lastTrip && lastTrip.status != 'finished') {
                await vehicleLocationService.updateVehicleStatusByLatestVendorId(socket.user.id, 'offline');
            }
            logger.info('Client disconnected');
        });
    });

    return io;
};

module.exports = setupSocket;
