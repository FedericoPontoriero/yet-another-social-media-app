const express = require("express");

const router = express.Router();

const { register, login, currentUser } = require("../controllers/auth");
const { requireSignIn } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignIn, currentUser);

module.exports = router;
