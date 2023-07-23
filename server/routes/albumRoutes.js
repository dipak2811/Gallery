const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:userId', authMiddleware, albumController.getAllAlbums);

router.get('/album/:id', authMiddleware, albumController.getAlbumById);

router.post('/:userId/create', authMiddleware, albumController.createAlbum);

router.put('/:albumId/addImage/:imageId', authMiddleware, albumController.addImageToAlbum);

module.exports = router;
