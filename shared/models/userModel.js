module.exports = (connection) => {
    if (connection.models.User) {
        return connection.models.User;
    }
    const userSchema = new connection.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'vendor'], required: true },
    }, { timestamps: true });

    return connection.model('User', userSchema);
};
