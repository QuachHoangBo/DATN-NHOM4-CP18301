const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Liên kết tới User
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }, // Liên kết tới Car
  status: { type: String, default: "pending" }, // Trạng thái booking: pending, confirmed, completed
  time: { type: Date, required: true }, // Thời gian booking
});

module.exports = mongoose.model("Booking", bookingSchema);
