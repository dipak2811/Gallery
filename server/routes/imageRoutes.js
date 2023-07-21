const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../utils/multerConfig');



// Get all images for authenticated user
router.get('/', authMiddleware, imageController.getAllImages);

// Get image by ID
router.get('/:id', imageController.getImageById);

// Upload image
router.post('/upload', authMiddleware, upload.single('image'), imageController.uploadImage);

// Like image
router.put('/:id/like', authMiddleware, imageController.likeImage);

// Comment on image
router.post('/:id/comment', authMiddleware, imageController.commentOnImage);

// Filter images by date
router.get('/filter/date', imageController.filterImagesByDate);

// Filter images by tag
router.get('/filter/tag/:tag', imageController.filterImagesByTag);

// Share image on social media (implement as needed)
router.post('/:id/share', imageController.shareImage);

module.exports = router;
