const multer = require('multer');

// Set the storage engine to save uploaded images to the 'uploads/' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image (you can use a library like 'uuid' for this)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

// Define the file filter to accept only images (you can modify the allowed file types if needed)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

// Initialize the Multer upload with the configuration
const upload = multer({ storage, fileFilter });

module.exports = upload;
