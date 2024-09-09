const userService = require("../services/userServices");

exports.register = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;
    const { token, user } = await userService.registerUser(email, password, nickname);
    
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

    const { token } = await userService.loginUser(email, password);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

