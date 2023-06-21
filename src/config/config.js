const mongoose = require('mongoose');

const url = `mongodb://127.0.0.1:27017/wedding`;

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
