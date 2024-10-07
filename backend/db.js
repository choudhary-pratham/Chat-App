const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database connnected");
});

db.on("error", (err) => {
  console.log("Error occured in connnecting with the database", err);
});

db.on("disconnected", () => {
  console.log("Database disconnnected");
});

module.exports = db;
