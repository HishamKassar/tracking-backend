class AuthDTO {
    constructor(user, token) {
        this.id = user._id;
        this.username = user.username;
        this.role = user.role;
        this.token = token;
    }
}

module.exports = AuthDTO;
