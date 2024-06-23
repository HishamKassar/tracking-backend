const express = require('express');
const tripController = require('../controllers/tripController');

const router = express.Router();

router.put('/status/:tripId', tripController.updateTripStatus);

router.get('/vendor', tripController.getVendorActiveTrip);

router.get('/:tripId', tripController.getTripById);
router.put('/:tripId', tripController.updateTrip);
router.get('/', tripController.getAllTrips);
router.post('/', tripController.createTrip);

module.exports = router;
