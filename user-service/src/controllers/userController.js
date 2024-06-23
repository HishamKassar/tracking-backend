const userService = require('../services/userService');
const { CreateUserDTO, UserDTO } = require('../dtos/userDTO');
const logger = require('../utils/logger');

class UserController {
    async registerUser(req, res) {
        try {
            const userData = new CreateUserDTO(req.body);
            const oldUser = await userService.getUserByUsername(userData.username);
            if (oldUser) {
                logger.warn(`User already found: ${req.params.username} to be created again`);
                res.status(400).json({ message: 'User already exist' });
                return;
            }
            const user = await userService.createUser(userData);
            const userDTO = new UserDTO(user);
            logger.info(`User registered: ${userDTO.username}`);
            res.status(200).json();
        } catch (error) {
            logger.error(`Error registering user: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const user = await userService.getUserByUsername(req.params.username);
            if (user) {
                const userDTO = new UserDTO(user);
                logger.info(`User found: ${userDTO.username}`);
                res.status(200).json(userDTO);
            } else {
                logger.warn(`User not found: ${req.params.username}`);
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            logger.error(`Error retrieving user: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            const userDTOs = users.map(user => new UserDTO(user));
            logger.info('All users retrieved');
            res.status(200).json(userDTOs);
        } catch (error) {
            logger.error(`Error retrieving all users: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllVendors(req, res) {
        try {
            const users = await userService.getAllVendors();
            const userDTOs = users.map(user => new UserDTO(user));
            logger.info('All vendors retrieved');
            res.status(200).json(userDTOs);
        } catch (error) {
            logger.error(`Error retrieving all vendors: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
