const express = require("express");

const router = express.Router();

const { createPost } = require("../controllers/post");

const { requireSignIn } = require("../middlewares/auth");

router.post("/create-post", requireSignIn, createPost);

module.exports = router;
