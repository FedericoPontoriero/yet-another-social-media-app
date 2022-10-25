const express = require("express");
import formidable from "express-formidable";

const router = express.Router();

const { createPost, uploadImage } = require("../controllers/post");

const { requireSignIn } = require("../middlewares/auth");

router.post("/create-post", requireSignIn, createPost);
router.post(
  "/upload-image",
  requireSignIn,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

module.exports = router;
