const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc    Register a new users
// @http    POST
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Var vänlig inkludera alla fält");
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Användaren existerar redan");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Felaktig användardata");
  }
});

// @desc    Login a user
// @http    POST
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //Check user exists and password match hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Felaktiga inloggningsuppgifter");
  }
});

// @desc    Get current user
// @http    GET
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
