const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const logger = require('./utils/logger');

connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(400).send('Something broke!');
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  logger.info(`Auth Service running on port ${PORT}`);
});
