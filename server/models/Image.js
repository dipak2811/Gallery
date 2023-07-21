const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  like: { type: Boolean, default: false },
  comments: [{ type: String }],
  date: { type: Date, default: Date.now },
  tags: [{ type: String }],
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
