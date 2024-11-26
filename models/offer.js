const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  offerBgImage: { type: String, required: true }, 
  offer: { type: String, required: true }, 
  title: { type: String, required: true }, 
  subTitle: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);

