const authService = require('../services/authService');
const AuthDTO = require('../dtos/authDTO');
const logger = require('../utils/logger');

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const { user, token } = await authService.login(username, password);
            const authDTO = new AuthDTO(user, token);
            res.status(200).json(authDTO);
        } catch (error) {
            logger.error(`Error in login: ${error.message}`);
            res.status(401).json({ error: error.message });
        }
    }

    async validateToken(req, res) {
        try {
            const { token } = req.body;
            const decoded = await authService.validateToken(token);
            res.status(200).json(decoded);
        } catch (error) {
            logger.error(`Error in token validation: ${error.message}`);
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
