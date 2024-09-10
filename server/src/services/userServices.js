const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.registerUser = async (email, password, username) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const newUser = await User.create({ email, password, username });
  return {
    token: signToken(newUser._id),
    user: newUser,
  };
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new Error("Incorrect email or password");
  }

  user.password = undefined;

  return {
    token: signToken(user._id),
    user,
  };
};
