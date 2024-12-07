const mongoose = require("mongoose");
require("dotenv").config()

const DB_URL = process.env.MONGO_URL;

const connection = mongoose.connect(DB_URL);

module.exports = { connection }
