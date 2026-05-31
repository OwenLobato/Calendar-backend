const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists'
      });
    }

    // Create user
    user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user
    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Server error'
    });
  }

};

const loginUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User does not exist'
      });
    }

    // Confirm passwords
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrect'
      });
    }

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Server error'
    });
  }
};

const revalidateToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'revalidate'
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken
};
