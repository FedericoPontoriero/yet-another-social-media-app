import expressJwt from "express-jwt";

import Post from "../models/post";
import User from "../models/user";

export const requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (req.user._id != post.postedBy) {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let following = user.following;
    following.push(user._id);
    const people = await User.find({
      _id: { $nin: following },
    })
      .select("-password -secret")
      .limit(10);
    res.json(people);
  } catch (err) {
    console.log(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
  } catch (err) {
    console.log(err);
  }
};
