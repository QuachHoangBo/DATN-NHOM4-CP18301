const express = require('express');
const router = express.Router();
const Offer = require('../models/offer');

// Tạo URL động cho offerBgImage
function generateOfferDataWithDynamicImage(offerData) {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;
  return offerData.map(offer => ({
    ...offer,
    offerBgImage: `http://${host}:${port}${offer.offerBgImage}`  // Tạo URL động cho offerBgImage
  }));
}

router.get('/offers', async (req, res) => {
  try {
    const offers = await Offer.find().lean();
    const offersWithDynamicImages = generateOfferDataWithDynamicImage(offers);  // Tạo URL động cho offerBgImage
    res.status(200).json(offersWithDynamicImages);  // Trả về danh sách offer
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm một offer mới
router.post('/offers', async (req, res) => {
  try {
    const offers = await Offer.insertMany(req.body);  // Chèn nhiều offer
    const offersWithDynamicImages = generateOfferDataWithDynamicImage(offers);  // Tạo URL động cho offerBgImage
    res.status(201).json({ message: 'Offers added successfully!', offers: offersWithDynamicImages });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/offers', async (req, res) => {
  try {
    const updatedFields = {
      offerBgImage: req.body.offerBgImage,
      offer: req.body.offer,
      title: req.body.title,
      subTitle: req.body.subTitle
    };

    await Offer.updateMany({}, { $set: updatedFields });

    // Lấy tất cả các offer đã cập nhật
    const updatedOffers = await Offer.find().lean();
    const offersWithDynamicImages = generateOfferDataWithDynamicImage(updatedOffers);

    res.status(200).json(offersWithDynamicImages);  
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Xóa tất cả các offer
router.delete('/offers', async (req, res) => {
  try {
    // Xóa tất cả các offer
    const result = await Offer.deleteMany({});
    
    res.status(200).json({ message: 'All offers deleted successfully', result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
