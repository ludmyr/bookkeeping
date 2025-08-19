const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/fileUploadDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ MongoDB connected');
}

module.exports = connectDB;
