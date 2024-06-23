jest.mock('shared/repositories/userRepository');
jest.mock('shared/utils/passwordUtil');
jest.mock('shared/utils/jwt');

const authService = require('../src/services/authService');
const { comparePassword } = require('shared/utils/passwordUtil');
const { generateToken, verifyToken } = require('shared/utils/jwt');

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const UserRepository = require('shared/repositories/userRepository');

let mongoServer;
let userRepository;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
    });
    userRepository = new UserRepository(mongoose);
    authService.userRepository = userRepository;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Auth Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should login a user with valid credentials', async () => {
        const userData = { username: 'user1', password: 'password', role: 'vendor' };
        const token = 'jwt_token';

        userRepository.getUserByUsername.mockReturnValue(userData);
        comparePassword.mockResolvedValue(true);
        generateToken.mockReturnValue(token);

        const result = await authService.login(userData.username, userData.password);

        expect(userRepository.getUserByUsername).toHaveBeenCalledWith(userData.username);
        expect(comparePassword).toHaveBeenCalledWith(userData.password, userData.password);
        expect(generateToken).toHaveBeenCalledWith(userData);
        expect(result).toEqual({ user: userData, token });
    });

    it('should throw an error for invalid credentials', async () => {
        const userData = { username: 'john_doe', password: 'password', role: 'vendor' };

        userRepository.getUserByUsername.mockResolvedValue(userData);
        comparePassword.mockResolvedValue(false);

        await expect(authService.login(userData.username, userData.password)).rejects.toThrow('Invalid username or password');
    });

    it('should validate a valid token', async () => {
        const decoded = { id: '1', username: 'john_doe', role: 'vendor' };
        const token = 'jwt_token';

        verifyToken.mockReturnValue(decoded);

        const result = await authService.validateToken(token);

        expect(verifyToken).toHaveBeenCalledWith(token);
        expect(result).toEqual(decoded);
    });

    it('should throw an error for an invalid token', async () => {
        const token = 'jwt_token';

        verifyToken.mockImplementation(() => { throw new Error('Invalid token'); });

        await expect(authService.validateToken(token)).rejects.toThrow('Invalid token');
    });
});
