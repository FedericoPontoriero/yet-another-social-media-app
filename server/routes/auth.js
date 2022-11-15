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
} = require("../controllers/auth");
const { requireSignIn } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignIn, currentUser);
router.post("/forgot-password", forgotPassword);
router.put("/profile-update", requireSignIn, profileUpdate);
router.get("/find-people", requireSignIn, findPeople);
router.put("/user-follow", requireSignIn, addFollower, userFollow);
module.exports = router;
