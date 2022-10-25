const express = require("express");
import formidable from "express-formidable";

const router = express.Router();

const { createPost, postsByUser, uploadImage } = require("../controllers/post");

const { requireSignIn } = require("../middlewares/auth");

router.post("/create-post", requireSignIn, createPost);
router.post(
  "/upload-image",
  requireSignIn,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

router.get("/user-posts", requireSignIn, postsByUser);

module.exports = router;
