const userService = require("../services/userServices");
const User = require("../models/User")

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const { token, user } = await userService.registerUser(
      email,
      password,
      username
    );

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password!",
      });
    }

    const { token, user } = await userService.loginUser(email, password);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'success',
      user, 
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};
