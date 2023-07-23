const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../utils/multerConfig");

router.get("/", authMiddleware, imageController.getAllImages);

router.get("/:id", imageController.getImageById);

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  imageController.uploadImage
);

router.put("/:id/like", authMiddleware, imageController.likeImage);

router.post("/:id/comment", authMiddleware, imageController.commentOnImage);

router.get("/filter/tag/:tag", imageController.filterImagesByTag);

router.post("/:id/share", imageController.shareImage);

module.exports = router;
