const Image = require("../models/Image");
const upload = require("../utils/multerConfig");
const admin = require("firebase-admin");

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

// Get image by ID
exports.getImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
};

const serviceAccount = require("../utils/gallery-app-5a68a-firebase-adminsdk-zsouo-b2729555df.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://gallery-app-5a68a.appspot.com",
});
const bucket = admin.storage().bucket();

// Upload image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    const imageUrl = req.file.path;
    const { title } = req.body;
    const filename = req.file.filename;
    await bucket.upload(imageUrl, {
      destination: `images/${filename}`,
    });
    const downloadUrl = await bucket.file(`images/${filename}`).getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });
    const image = new Image({ title, imageUrl: downloadUrl[0] });
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
};

// Like image
exports.likeImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    image.likes += 1;
    await image.save();
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to like image" });
  }
};

// Comment on image
exports.commentOnImage = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    image.comments.push(comment);
    await image.save();
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to comment on image" });
  }
};

// Search images by keyword
exports.searchImages = async (req, res) => {
  const { keyword } = req.params;
  try {
    const images = await Image.find({ $text: { $search: keyword } });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to search images" });
  }
};

// Filter images by date
exports.filterImagesByDate = async (req, res) => {
  try {
    const images = await Image.find().sort({ date: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to filter images by date" });
  }
};

// Filter images by tag
exports.filterImagesByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const images = await Image.find({ tags: tag });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to filter images by tag" });
  }
};

// Download image (Not implemented in this example, but you can add it as needed)
exports.downloadImage = async (req, res) => {
  // Implement download image logic here
};

// Share image on social media (Not implemented in this example, but you can add it as needed)
exports.shareImage = async (req, res) => {
  // Implement share image logic here
};
