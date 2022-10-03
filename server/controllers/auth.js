import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, secret } = req.body;
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  if (!email) {
    return res.json({
      error: "Email is required",
    });
  }
  if (!password || password.length < 6) {
    return res.json({
      error: "Password is required and should be 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Answer is required",
    });
  }
  const exists = await User.findOne({ email });
  if (exists) {
    return res.json({
      error: "Email is taken",
    });
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword, secret });
  try {
    await user.save();
    return res.json({
      ok: true,
    });
  } catch (e) {
    console.log("register failed => ", err);
    return res.status(400).send("Error, try again");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error, try again");
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const forgotPassword = async (req, res) => {
  const { email, newPassword, secret } = req.body;

  if (!newPassword || !newPassword.length < 6) {
    return res.json({
      error: "New password is required and should be minimum 6 characters long",
    });
  }

  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }

  const user = await User.findOne({ email, secret });
  if (!user) {
    return res.json({
      error: "We can'\t verify you with those details",
    });
  }

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats, now you can login with your new password",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Something went wrong. Try again.",
    });
  }
};
