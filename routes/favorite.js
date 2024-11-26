const express = require('express');
const router = express.Router();
const FavoriteCar = require('../models/favorite');
const Available = require('../models/available');

// Tạo URL động cho hình ảnh của xe yêu thích
function generateFavoriteDataWithDynamicImage(favoriteData) {
    const host = process.env.HOST || 'localhost'; // Lấy host từ biến môi trường hoặc mặc định là localhost
    const port = process.env.PORT || 3000; // Lấy port từ biến môi trường hoặc mặc định là 3000
    return favoriteData.map(favorite => ({
        ...favorite,
        carDetails: {
            ...favorite.carDetails,
            carImage: `http://${host}:${port}${favorite.carDetails.carImage}` // Tạo URL động cho carImage
        }
    }));
};

// Thêm xe vào danh sách yêu thích
router.post('/favorites', async (req, res) => {
    const { carId } = req.body;

    if (!carId) {
        return res.status(400).json({ message: 'carId is required' });
    }

    try {
        const existingFavoriteCar = await FavoriteCar.findOne({ carId });

        if (existingFavoriteCar) {
            return res.status(400).json({ message: 'Car is already in favorites' });
        }

        const newFavoriteCar = new FavoriteCar({ carId });
        await newFavoriteCar.save();

        return res.status(201).json({ message: 'Car added to favorites', favorite: newFavoriteCar });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding car to favorites', error: error.message });
    }
});

// Xóa xe khỏi danh sách yêu thích
router.delete('/favorites/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const favoriteCar = await FavoriteCar.findByIdAndDelete(id); // Sử dụng findByIdAndDelete để tìm bằng _id
        if (!favoriteCar) {
            return res.status(404).json({ message: 'Favorite car not found' });
        }

        return res.status(200).json({ message: 'Car removed from favorites' });
    } catch (error) {
        return res.status(500).json({ message: 'Error removing car from favorites', error: error.message });
    }
});


// Lấy danh sách các xe yêu thích và chi tiết
router.get('/favorites', async (req, res) => {
    const host = process.env.HOST || 'localhost'; // Lấy host từ biến môi trường hoặc mặc định là localhost
    const port = process.env.PORT || 3000; // Lấy port từ biến môi trường hoặc mặc định là 3000

    try {
        const favoriteCars = await FavoriteCar.find();
        console.log("Danh sách xe yêu thích:", favoriteCars);

        const favoriteCarsWithDetails = await Promise.all(
            favoriteCars.map(async (favorite) => {
                const carDetails = await Available.findById(favorite.carId); // Tìm xe trong mô hình Available
                if (!carDetails) {
                    console.warn(`Chi tiết xe không tìm thấy cho carId: ${favorite.carId}`);
                }
                return {
                    ...favorite.toObject(),
                    carDetails: carDetails ? {
                        ...carDetails.toObject(),
                        carImage: `http://${host}:${port}${carDetails.carImage}` 
                    } : null 
                };
            })
        );

        return res.status(200).json(favoriteCarsWithDetails);
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách xe yêu thích', error: error.message });
    }
});


// Kiểm tra trạng thái yêu thích của xe
router.get('/favorites/:carId', async (req, res) => {
    const { carId } = req.params;

    if (!carId) {
        return res.status(400).json({ message: 'carId is required' });
    }

    try {
        const favoriteCar = await FavoriteCar.findOne({ carId });

        return res.status(200).json({ isFavorite: !!favoriteCar });
    } catch (error) {
        return res.status(500).json({ message: 'Error checking favorite status', error: error.message });
    }
});

// Xóa tất cả các xe yêu thích
router.delete('/favorites', async (req, res) => {
    try {
        // Xóa tất cả các xe yêu thích
        const result = await FavoriteCar.deleteMany({});
        
        res.status(200).json({ message: 'All favorite cars deleted successfully', result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
