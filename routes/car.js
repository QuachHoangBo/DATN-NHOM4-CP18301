const express = require('express');
const router = express.Router();
const Car = require('../models/car');

// Tạo URL động cho carImage
function generateCarDataWithDynamicImage(carData) {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;
  return carData.map(car => ({
    ...car,
    carImage: `http://${host}:${port}${car.carImage}`  // Tạo URL động cho carImage
  }));
}

// Lấy tất cả các xe hơi (hot deals)
router.get('/deals', async (req, res) => {
  try {
    // Sử dụng .lean() để trả về dữ liệu thô mà không có các thuộc tính Mongoose
    const cars = await Car.find().lean();
    const carsWithDynamicImages = generateCarDataWithDynamicImage(cars);  // Tạo URL động cho carImage
    res.json(carsWithDynamicImages);  // Trả về dữ liệu JSON đã được xử lý
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST thêm danh sách xe mới vào hot deals
router.post('/hotdeals', async (req, res) => {
  const hotDealsList = req.body;  // Lấy dữ liệu từ body của request

  try {
    const carsToInsert = hotDealsList.map(deal => ({
      carImage: deal.carImage,        
      carBrand: deal.carBrand,        
      amountPerDay: deal.amountPerDay, 
      carModel: deal.carModel,      
      location: deal.location,     
      rating: deal.rating,           
      discountInPercentage: deal.discountInPercentage
    }));

    await Car.insertMany(carsToInsert);
    res.status(201).json({ message: 'Cars added successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật tất cả các xe hơi dựa trên danh sách được cung cấp
router.put('/hotdeals', async (req, res) => {
  const hotDealsList = req.body;  // Nhận danh sách các xe từ body của request
  
  try {
    for (const deal of hotDealsList) {
      // Sử dụng updateMany() với {} để cập nhật tất cả tài liệu
      await Car.updateMany({}, {
        $set: { 
          carImage: deal.carImage,
          carBrand: deal.carBrand,
          amountPerDay: deal.amountPerDay,
          carModel: deal.carModel,
          location: deal.location,
          rating: deal.rating,
          discountInPercentage: deal.discountInPercentage
        }
      });
    }
    res.status(200).json({ message: 'All cars updated successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa tất cả xe hot deals
router.delete('/hotdeals', async (req, res) => {
  try {
    const result = await Car.deleteMany({});
    res.status(200).json({ message: 'All cars deleted successfully!', result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
