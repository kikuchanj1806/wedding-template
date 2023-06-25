require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.DATABASE_URL;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports.connectDB = async () => {
  try {
    await mongoose.connect(url, connectionParams);
    console.log('Connected to the database');
  } catch (error) {
    console.error(`Error connecting to the database. \n${error}`);
  }
};
