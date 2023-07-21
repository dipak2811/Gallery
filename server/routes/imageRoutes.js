const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const upload = require('../utils/multerConfig'); 

// Get all images
router.get('/', imageController.getAllImages);

// Get image by ID
router.get('/:id', imageController.getImageById);

// Upload image
router.post('/upload', upload.single('image'), imageController.uploadImage);

// Like image
router.put('/:id/like', imageController.likeImage);

// Comment on image
router.post('/:id/comment', imageController.commentOnImage);

// Filter images by date
router.get('/filter/date', imageController.filterImagesByDate);

// Filter images by tag
router.get('/filter/tag/:tag', imageController.filterImagesByTag);

// Share image on social media (implement as needed)
router.post('/:id/share', imageController.shareImage);

module.exports = router;
