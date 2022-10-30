const mongoose = require("mongoose");
const { dbHost, dbName, dbPort, dbUser, dbPass } = require("../app/config.js");

// MONGO : USING USERNAME & PASSWORD
// mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Without Username & pass
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;
