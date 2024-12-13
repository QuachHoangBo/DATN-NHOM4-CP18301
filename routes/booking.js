const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Car = require("../models/car");
const User = require("../models/auth");

// 1. API tạo booking
router.post("/create", async (req, res) => {
  const { userId, carId, time } = req.body;

  try {
    // Kiểm tra xe có tồn tại và đang rảnh
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found!" });

    // Kiểm tra User có tồn tại không
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Tạo booking mới
    const newBooking = new Booking({ userId, carId, time });
    await newBooking.save();

    // Cập nhật trạng thái xe (nếu cần)
    car.status = "busy";
    await car.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error });
  }
});

// 2. API lấy danh sách booking của người dùng
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ userId }).populate("carId");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});

// 3. API lấy danh sách booking của tài xế
router.get("/driver/:driverId", async (req, res) => {
  const { driverId } = req.params;

  try {
    // Lấy các xe thuộc tài xế
    const cars = await Car.find({ driverId });
    const carIds = cars.map((car) => car._id);

    // Lấy tất cả booking liên quan tới các xe của tài xế
    const bookings = await Booking.find({ carId: { $in: carIds } }).populate(
      "userId carId"
    );
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings for driver:", error);
    res
      .status(500)
      .json({ message: "Error fetching bookings for driver", error });
  }
});

// 4. API cập nhật trạng thái booking (ví dụ: tài xế xác nhận chuyến đi)
router.put("/:bookingId/status", async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking)
      return res.status(404).json({ message: "Booking not found!" });

    // Cập nhật trạng thái
    booking.status = status;
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking status updated successfully", booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Error updating booking status", error });
  }
});

module.exports = router;
