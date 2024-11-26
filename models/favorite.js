const mongoose = require('mongoose');

const favoriteCarSchema = new mongoose.Schema({
    carId: {
        type: String,
        required: true,
        unique: true 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('FavoriteCar', favoriteCarSchema);
