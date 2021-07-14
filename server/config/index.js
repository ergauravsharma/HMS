const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || 'supersecretalltheway';
const ROOT = process.env.ROOT || '';

// init config obj containing the app settings
const config = {
  env: NODE_ENV,
  root: ROOT,
  server: {
    port: PORT,
  },
  secret: SECRET,
};

module.exports = config;