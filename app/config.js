const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

module.exports = {
  serviceName: process.env.SERVICE_NAME,
  secretKey: process.env.SECRET_KEY,

  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPort: process.env.DB_PORT,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,

  rootPath: path.resolve(__dirname, ".."),
};
