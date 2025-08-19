const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  filePath: { type: String, unique: true },
});

module.exports = mongoose.model('Item', ItemSchema);
