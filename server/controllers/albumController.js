const Album = require("../models/Album");
const Image = require("../models/Image");

// Get all albums
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch albums" });
  }
};

// Get album by ID
exports.getAlbumById = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id).populate("images");
    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch album" });
  }
};

// Create album
exports.createAlbum = async (req, res) => {
  const { title } = req.body;
  try {
    const album = new Album({ title });
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ error: "Failed to create album" });
  }
};

// Add image to album
exports.addImageToAlbum = async (req, res) => {
  const { albumId, imageId } = req.params;
  try {
    const album = await Album.findById(albumId);
    const image = await Image.findById(imageId);
    if (!album || !image) {
      return res.status(404).json({ error: "Album or image not found" });
    }
    album.images.push(imageId);
    await album.save();
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ error: "Failed to add image to album" });
  }
};
