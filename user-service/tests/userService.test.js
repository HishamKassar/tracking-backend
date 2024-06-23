const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const UserRepository = require('shared/repositories/userRepository');
const userService = require('../src/services/userService');

let mongoServer;
let userRepository;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
    });
    userRepository = new UserRepository(mongoose);
    userService.userRepository = userRepository;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Service', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('should create a user', async () => {
        const userData = { username: 'testuser', password: 'password', role: 'admin' };

        const user = await userService.createUser(userData);
        expect(user).toHaveProperty('_id');
        expect(user.username).toBe(userData.username);
        expect(user.role).toBe(userData.role);
    });

    it('should get a user by username', async () => {
        const userData = { username: 'testuser', password: 'password', role: 'admin' };

        await userService.createUser(userData);

        const user = await userService.getUserByUsername(userData.username);
        expect(user).toHaveProperty('_id');
        expect(user.username).toBe(userData.username);
    });

    it('should get all users', async () => {
        const userData1 = { username: 'testuser1', password: 'password', role: 'admin' };
        const userData2 = { username: 'testuser2', password: 'password', role: 'vendor' };

        await userService.createUser(userData1);
        await userService.createUser(userData2);

        const users = await userService.getAllUsers();
        expect(users.length).toBe(2);
    });
});
