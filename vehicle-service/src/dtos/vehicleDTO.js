class VehicleDTO {
    constructor(vehicle) {
        this.id = vehicle.id;
        this.type = vehicle.type;
        this.plate = vehicle.plate;
        this.createdAt = vehicle.createdAt;
        this.updatedAt = vehicle.updatedAt;
    }
}

module.exports = VehicleDTO;
