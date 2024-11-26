// models/Car.js
const mongoose = require('mongoose');

const AvailableSchema = new mongoose.Schema({
    carImage: { type: String, required: true },
    inSaved: { type: Boolean, default: false },
    carBrand: { type: String, required: true },
    carType: { type: String, required: true },
    carModel: { type: String, required: true },
    amountPerDay: { type: Number, required: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 5.0 },
    seats: { type: Number, required: true },
});

module.exports = mongoose.model('Availabe', AvailableSchema);
