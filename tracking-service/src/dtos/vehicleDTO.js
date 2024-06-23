class VehicleLocationDTO {
    constructor(vehicle) {
        this.tripId = vehicle.tripId;
        this.vehicleId = vehicle.vehicleId;
        this.vendorId = vehicle.vendorId;
        this.currentLocation = vehicle.currentLocation;
        this.status = vehicle.status;
        this.createdAt = vehicle.createdAt;
        this.updatedAt = vehicle.updatedAt;
    }
}

module.exports = VehicleLocationDTO;
