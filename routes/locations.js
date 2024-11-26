const express = require('express');
const router = express.Router();
const Location = require('../models/locations');

// API để lấy tất cả các địa chỉ
router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find({}, 'address');  // Chỉ lấy trường address
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/add', async (req, res) => {
  const locationsList = req.body;  // Lấy toàn bộ dữ liệu từ body (JSON)

  // Kiểm tra nếu locationsList không phải là mảng hoặc mảng rỗng
  if (!Array.isArray(locationsList) || locationsList.length === 0) {
    return res.status(400).json({ message: "Invalid locations list" });
  }

  try {
    // Map mỗi phần tử trong mảng thành một đối tượng Location mới
    const locationsToInsert = locationsList.map(item => new Location({ address: item.address }));
    
    await Location.insertMany(locationsToInsert);

    res.status(201).json({ message: 'Locations added successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
