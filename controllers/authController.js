const User = require ('../models/userModel');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const generateToken = user => {
  return jwt.sign ({id: user._id, role: user.role}, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Register
const register = async (req, res) => {
  const {name, email, password, role} = req.body;

  const userExists = await User.findOne ({email});
  if (userExists) {
    return res.status (400).json ({message: 'User already exists'});
  }

  const user = await User.create ({name, email, password, role});

  res.status (201).json ({
    _id: user._id,
    name: user.name,
    role: user.role,
    token: generateToken (user),
  });
};

// Login
const login = async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne ({email});
  if (!user || !await bcrypt.compare (password, user.password)) {
    return res.status (401).json ({message: 'Invalid credentials'});
  }

  res.json ({
    _id: user._id,
    name: user.name,
    role: user.role,
    token: generateToken (user),
  });
};

module.exports = {register, login};
