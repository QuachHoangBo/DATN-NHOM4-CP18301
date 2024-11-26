const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Location', locationSchema);
