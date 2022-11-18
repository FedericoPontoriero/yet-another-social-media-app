const express = require("express");
import formidable from "express-formidable";

const router = express.Router();

const {
  createPost,
  postsByUser,
  totalPosts,
  uploadImage,
  userPost,
  updatePost,
  newsFeed,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  removeComment,
} = require("../controllers/post");

const { requireSignIn, canEditDeletePost } = require("../middlewares/auth");

router.post("/create-post", requireSignIn, createPost);
router.post(
  "/upload-image",
  requireSignIn,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

router.get("/user-posts", requireSignIn, postsByUser);
router.get("/user-posts/:_id", requireSignIn, userPost);
router.put("/update-post/:_id", requireSignIn, canEditDeletePost, updatePost);
router.delete(
  "/delete-post/:_id",
  requireSignIn,
  canEditDeletePost,
  deletePost
);

router.get("/news-feed", requireSignIn, newsFeed);

router.put("like-post", requireSignIn, likePost);
router.put("unlike-post", requireSignIn, unlikePost);

router.put("/add-comment", requireSignIn, addComment);
router.put("/remove-comment", requireSignIn, removeComment);

router.get("/total-posts", totalPosts);

module.exports = router;
