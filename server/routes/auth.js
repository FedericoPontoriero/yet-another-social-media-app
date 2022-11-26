const express = require("express");

const router = express.Router();

const {
  register,
  login,
  currentUser,
  profileUpdate,
  findPeople,
  forgotPassword,
  addFollower,
  userFollow,
  userFollowing,
  userUnfollow,
  searchUser,
  getUser,
} = require("../controllers/auth");
const { requireSignIn } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);

router.get("/current-user", requireSignIn, currentUser);
router.post("/forgot-password", forgotPassword);

router.put("/profile-update", requireSignIn, profileUpdate);

router.get("/find-people", requireSignIn, findPeople);
router.put("/user-follow", requireSignIn, addFollower, userFollow);
router.put("/user-unfollow", requireSignIn, removeFollower, userUnfollow);

router.get("/user-following", requireSignIn, userFollowing);

router.get("/search-user/:query", searchUser);
router.get("/user/:username", getUser);
module.exports = router;
