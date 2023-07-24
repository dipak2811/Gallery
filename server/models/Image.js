const mongoose = require("mongoose");
const Album = require("./Album");

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  like: { type: Boolean, default: false },
  comments: [{ type: String }],
  tags: [{ type: String }],
  date: { type: Date, default: Date.now },
});

imageSchema.pre("remove", async function (next) {
  try {
    const albums = await Album.find({ images: this._id });
    for (const album of albums) {
      album.images.pull(this._id);
      await album.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
