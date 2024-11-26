const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carImage: {
    type: String, 
    required: true,
  },
  carBrand: {
    type: String,
    required: true,
  },
  amountPerDay: {
    type: Number,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  discountInPercentage: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
});

module.exports = mongoose.model('Car', carSchema);
