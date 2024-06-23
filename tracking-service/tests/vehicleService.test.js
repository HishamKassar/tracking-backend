jest.mock('../src/repositories/vehicleRepository');

const vehicleService = require('../src/services/vehicleService');
const vehicleRepository = require('../src/repositories/vehicleRepository');

describe('Vehicle Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update vehicle location', async () => {
        const vehicleId = '123';
        const location = { latitude: 10, longitude: 10 };
        const updatedVehicle = { _id: '1', vehicleId, currentLocation: location, status: 'in-transit' };

        vehicleRepository.createOrUpdateVehicle.mockResolvedValue(updatedVehicle);

        const vehicle = await vehicleService.updateVehicleLocation(vehicleId, location);

        expect(vehicleRepository.createOrUpdateVehicle).toHaveBeenCalledWith(vehicleId, location);
        expect(vehicle).toEqual(updatedVehicle);
    });

    it('should get a vehicle by ID', async () => {
        const vehicleId = '123';
        const foundVehicle = { _id: '1', vehicleId, currentLocation: { latitude: 0, longitude: 0 }, status: 'idle' };

        vehicleRepository.getVehicleById.mockResolvedValue(foundVehicle);

        const vehicle = await vehicleService.getVehicleById(vehicleId);

        expect(vehicleRepository.getVehicleById).toHaveBeenCalledWith(vehicleId);
        expect(vehicle).toEqual(foundVehicle);
    });
});
