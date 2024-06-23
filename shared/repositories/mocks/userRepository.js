const userRepositoryMock = {
    createUser: jest.fn(),
    getUserByUsername: jest.fn(),
    getAllUsers: jest.fn(),
};

module.exports = userRepositoryMock;
