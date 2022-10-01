import User from "../models/user";
import { hashPassword, comparePassword } from '../helpers/auth'
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
  const { name, email, password, secret } = req.body;
  if (!name)
    return res.status(400).send('Name is required');
  if (!email)
    return res.status(400).send('Email is required');
  if (!password || password.length < 6)
    return res.status(400).send('Password is required & should be 6 characters minimum');
  if (!secret)
    return res.status(400).send('Answer is required');
  const exists = await User.findOne({ email })
  if (exists) return res.status(400).send('Email is taken')

  const hashedPassword = await hashPassword(password)

  const user = new User({ name, email, password: hashedPassword, secret })
  try {
    await user.save()
    return res.json({
      ok: true
    })
  } catch (e) {
    console.log('register failed => ', err);
    return res.status(400).send('Error, try again')
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).send('No user found')

    const match = await comparePassword(password, user.password)
    if (!match) return res.status(400).send('Wrong password')

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user
    });

  } catch (err) {
    console.log(err);
    return res.status(400).send('Error, try again');
  }

}
