const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const imageRoutes = require("./routes/imageRoutes");
const albumRoutes = require("./routes/albumRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = "mongodb://0.0.0.0:27017/gallery-store";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
app.use("/images", imageRoutes);
app.use("/albums", albumRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
