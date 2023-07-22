const Image = require("../models/Image");
const admin = require("firebase-admin");
const serviceAccount = require("../utils/gallery-app-5a68a-firebase-adminsdk-zsouo-b2729555df.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://gallery-app-5a68a.appspot.com",
});
const bucket = admin.storage().bucket();

exports.getAllImages = async (req, res) => {
  try {
    const userId = req.user._id;
    const images = await Image.find({ userId });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

exports.getImageById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const image = await Image.findOne({ _id: id, userId });
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    const imageUrl = req.file.path;
    const { title } = req.body;
    const filename = req.file.filename;
    const userId = req.user._id;
    await bucket.upload(imageUrl, {
      destination: `images/${filename}`,
    });
    const downloadUrl = await bucket.file(`images/${filename}`).getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });
    const image = new Image({ title, imageUrl: downloadUrl[0], userId });
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
};

exports.likeImage = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const image = await Image.findOne({ _id: id, userId });
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    image.like = !image.like;
    await image.save();
    res.status(200).json(image);
  } catch (error) {
    console.error("Error liking image:", error);
    res.status(500).json({ error: "Failed to like image" });
  }
};

exports.commentOnImage = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const userId = req.user._id;
  try {
    const image = await Image.findOne({ _id: id, userId });
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

exports.filterImagesByDate = async (req, res) => {
  try {
    const userId = req.user._id;  
    const images = await Image.find({ userId }).sort({ date: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to filter images by date" });
  }
};

exports.filterImagesByTag = async (req, res) => {
  const { tag } = req.params;
  const userId = req.user._id;
  try {
    const images = await Image.find({ tags: tag, userId });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to filter images by tag" });
  }
};

exports.shareImage = async (req, res) => {

};

module.exports = exports;
