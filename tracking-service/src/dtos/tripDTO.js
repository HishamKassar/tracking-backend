class TripDTO {
    constructor(trip) {
        this.id = trip.id;
        this.vehicleId = trip.vehicleId;
        this.vendorId = trip.vendorId;
        this.pickUpLocation = trip.pickUpLocation;
        this.dropOffLocation = trip.dropOffLocation;
        this.status = trip.status;
        this.createdAt = trip.createdAt;
        this.updatedAt = trip.updatedAt;
    }
}

module.exports = TripDTO;
