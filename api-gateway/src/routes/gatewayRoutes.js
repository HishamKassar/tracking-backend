const { createProxyMiddleware } = require('http-proxy-middleware');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

module.exports = (app) => {

  app.use('/api/v1/users', authMiddleware, authorizeRoles('admin'), createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}/api/v1/users`,
    changeOrigin: true
  }));

  app.use('/api/v1/vehicles', authMiddleware, authorizeRoles('admin'), createProxyMiddleware({
    target: `${process.env.VEHICLE_SERVICE_URL}/api/v1/vehicles`,
    changeOrigin: true
  }));

  app.use('/api/v1/users/vendors', authMiddleware, authorizeRoles('admin'), createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}/api/v1/users/vendors`,
    changeOrigin: true
  }));

  app.use('/api/v1/auth/login', createProxyMiddleware({
    target: `${process.env.AUTH_SERVICE_URL}/api/v1/auth/login`,
    changeOrigin: true,
  }));

  app.use('/api/v1/vehicleLocations', authMiddleware, authorizeRoles('admin'), createProxyMiddleware({
    target: `${process.env.TRACKING_SERVICE_URL}/api/v1/vehicleLocations`,
    changeOrigin: true
  }));

  app.post('/api/v1/trips', authMiddleware, authorizeRoles('admin'), createProxyMiddleware({
    target: process.env.TRACKING_SERVICE_URL,
    changeOrigin: true
  }));
  app.get('/api/v1/trips', authMiddleware, authorizeRoles('admin'), createProxyMiddleware({
    target: process.env.TRACKING_SERVICE_URL,
    changeOrigin: true
  }));
  app.put('/api/v1/trips/:tripId', authMiddleware, authorizeRoles('admin'), createProxyMiddleware({
    target: process.env.TRACKING_SERVICE_URL,
    changeOrigin: true
  }));
  app.get('/api/v1/trips/:tripId', authMiddleware, authorizeRoles('admin', 'vendor'), createProxyMiddleware({
    target: process.env.TRACKING_SERVICE_URL,
    changeOrigin: true
  }));
  app.put('/api/v1/trips/status/:tripId', authMiddleware, authorizeRoles('admin', 'vendor'), createProxyMiddleware({
    target: process.env.TRACKING_SERVICE_URL,
    changeOrigin: true
  }));
  app.get('/api/v1/trips/vendor', authMiddleware, authorizeRoles('vendor'), createProxyMiddleware({
    target: process.env.TRACKING_SERVICE_URL,
    changeOrigin: true
  }));
  
};
