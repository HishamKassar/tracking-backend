class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.role = user.role;
    }
}

class CreateUserDTO {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.role = data.role;
    }
}

module.exports = { UserDTO, CreateUserDTO };
