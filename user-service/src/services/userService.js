const UserRepository = require('shared/repositories/userRepository');
const logger = require('../utils/logger');
const { hashPassword } = require('shared/utils/passwordUtil');
const { mongoose } = require('../config/db');

const userRepository = new UserRepository(mongoose);

class UserService {
    async createUser(userData) {
        try {
            userData.password = await hashPassword(userData.password);
            const user = await userRepository.createUser(userData);
            logger.info(`User created: ${user.username}`);
            return user;
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            throw error;
        }
    }

    async getUserByUsername(username) {
        try {
            const user = await userRepository.getUserByUsername(username);
            logger.info(`User retrieved: ${username}`);
            return user;
        } catch (error) {
            logger.error(`Error retrieving user: ${error.message}`);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await userRepository.getAllUsers();
            logger.info('All users retrieved');
            return users;
        } catch (error) {
            logger.error(`Error retrieving all users: ${error.message}`);
            throw error;
        }
    }

    async getAllVendors() {
        try {
            const vendors = await userRepository.getAllVendors();
            logger.info('All vendors retrieved');
            return vendors;
        } catch (error) {
            logger.error(`Error retrieving all vendors: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new UserService();
