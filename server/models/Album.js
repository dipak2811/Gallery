const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  date: { type: Date, default: Date.now },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
