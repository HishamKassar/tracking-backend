const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/vendors', userController.getAllVendors);

router.post('/', userController.registerUser);
router.get('/:username', userController.getUser);
router.get('/', userController.getAllUsers);


module.exports = router;
