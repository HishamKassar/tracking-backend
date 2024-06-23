const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const logger = require('./utils/logger');
const userService = require('./services/userService');

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

userService.getAllUsers()
.then((users) => {
    if (users.length == 0) {
        userService.createUser({username: 'admin', password: "Test@123", role: "admin"})
        .then(() => {
        })
        .catch((e) => {
            console.log("ERROR", e);
        });

        userService.createUser({username: 'vendor', password: "Test@123", role: "vendor"})
        .then(() => {
        })
        .catch((e) => {
            console.log("ERROR", e);
        });
    }
})
.catch((error) => {
    logger.error('Seed users failed:', error.message);
});

// Define routes
app.use('/api/v1/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
