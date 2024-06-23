require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const setupRoutes = require('./routes/gatewayRoutes');
const { createProxyMiddleware } = require('http-proxy-middleware');

const trackingServiceProxy = createProxyMiddleware({
  target: process.env.TRACKING_SERVICE_URL,
  changeOrigin: true,
  ws: true
});

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN
}));

// Middleware to log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

setupRoutes(app);

app.use('/:access_token', trackingServiceProxy)

const server = app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
});

server.on('upgrade', trackingServiceProxy.upgrade);