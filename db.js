const mongoose = require('mongoose');
// nxK.D5AWgvwe$p-P.
const url = "mongodb+srv://Abhi:nxK.D5AWgvwe$p-P.@cluster0.amltn4l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    throw err;
  }
};

module.exports = connectToMongoDB;
