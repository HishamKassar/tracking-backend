const UserRepository = require('shared/repositories/userRepository');
const { generateToken, verifyToken } = require('shared/utils/jwt');
const { comparePassword } = require('shared/utils/passwordUtil');
const logger = require('../utils/logger');
const { mongoose } = require('../config/db');

const userRepository = new UserRepository(mongoose);

class AuthService {
    async login(username, password) {
        try {
            const user = await userRepository.getUserByUsername(username);
            if (user && await comparePassword(password, user.password)) {
                const token = generateToken(user);
                logger.info(`User logged in: ${username}`);
                return { user, token };
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (error) {
            logger.error(`Error logging in user: ${error.message}`);
            throw error;
        }
    }

    async validateToken(token) {
        try {
            const decoded = verifyToken(token);
            logger.info(`Token validated for user: ${decoded.username}`);
            return decoded;
        } catch (error) {
            logger.error(`Error validating token: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new AuthService();
module.exports.userRepository = userRepository;
