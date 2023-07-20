const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

// Get all albums
router.get('/', albumController.getAllAlbums);

// Get album by ID
router.get('/:id', albumController.getAlbumById);

// Create album
router.post('/create', albumController.createAlbum);

// Add image to album
router.post('/:albumId/add/:imageId', albumController.addImageToAlbum);

module.exports = router;
