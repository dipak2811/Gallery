const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all albums for authenticated user
router.get('/:userId', authMiddleware, albumController.getAllAlbums);

// Get album by ID
router.get('/album/:id', authMiddleware, albumController.getAlbumById);

// Create album
router.post('/:userId/create', authMiddleware, albumController.createAlbum);

// Add image to album
router.put('/:albumId/addImage/:imageId', authMiddleware, albumController.addImageToAlbum);

module.exports = router;
