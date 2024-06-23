const express = require('express');
const vehicleLocationController = require('../controllers/vehicleLocationController');

const router = express.Router();

router.get('/vendor/:vendorId', vehicleLocationController.getVehicleByVendorId);
router.get('/:vehicleId', vehicleLocationController.getVehicleById);
router.get('/', vehicleLocationController.getAllVehicles);

module.exports = router;
