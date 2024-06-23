class UserRepository {
    constructor(connection) {
        this.User = require('../models/userModel')(connection);
    }

    async createUser(userData) {
        const user = new this.User(userData);
        return await user.save();
    }

    async getUserByUsername(username) {
        return await this.User.findOne({ username });
    }

    async getAllUsers() {
        return await this.User.find();
    }

    async getAllVendors() {
        return await this.User.find({ role: 'vendor' });
    }
}

module.exports = UserRepository;
