const express = require('express');
const Available = require('../models/available');
const router = express.Router();

// Tạo URL động cho carImage
function generateAvailableDataWithDynamicImage(carData) {
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 3000;
    return carData.map(car => ({
        ...car,
        carImage: `http://${host}:${port}${car.carImage}` // Tạo URL động cho carImage
    }));
}

// Get all cars
router.get('/available', async (req, res) => {
    try {
        const cars = await Available.find().lean();
        const carsWithDynamicImages = generateAvailableDataWithDynamicImage(cars); // Tạo URL động cho carImage
        res.json(carsWithDynamicImages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get car by ID
router.get('/available/:id', async (req, res) => {
    try {
        const car = await Available.findById(req.params.id).lean();
        if (!car) return res.status(404).json({ message: 'Car not found' });
        const carWithDynamicImage = generateAvailableDataWithDynamicImage([car])[0]; // Tạo URL động cho carImage
        res.json(carWithDynamicImage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new car
// Create multiple cars
router.post('/available', async (req, res) => {
    try {
        // Sử dụng insertMany để thêm nhiều đối tượng vào cơ sở dữ liệu
        const newAvailableCars = await Available.insertMany(req.body);
        // Tạo URL động cho carImage cho tất cả các đối tượng mới
        const newAvailableCarsWithDynamicImages = generateAvailableDataWithDynamicImage(newAvailableCars);
        res.status(201).json(newAvailableCarsWithDynamicImages);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update car by ID
router.put('/available/:id', async (req, res) => {
    try {
        const updatedAvailable = await Available.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
        if (!updatedAvailable) return res.status(404).json({ message: 'Car not found' });
        const updatedAvailableWithDynamicImage = generateAvailableDataWithDynamicImage([updatedAvailable])[0]; // Tạo URL động cho carImage
        res.json(updatedAvailableWithDynamicImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete car by ID
router.delete('/available/:id', async (req, res) => {
    try {
        const available = await Available.findByIdAndDelete(req.params.id);
        if (!available) return res.status(404).json({ message: 'Car not found' });
        res.json({ message: 'Car deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
