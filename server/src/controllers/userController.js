const userService = require("../services/userServices");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const { accessToken, user } = await userService.registerUser(
      email,
      password,
      username
    );

    res.status(201).json({
      status: "success",
      accessToken, 
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

    const { accessToken, user } = await userService.loginUser(email, password);

    res.status(200).json({
      status: "success",
      accessToken, 
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
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

exports.refreshToken = async (req, res) => {
  const { userId } = req.body;
  console.log("User ID received:", userId); // Първи дебъг съобщение

  try {
    console.log("Searching for refresh token in the database...");
    const storedRefreshToken = await RefreshToken.findOne({ userId });

    if (!storedRefreshToken) {
      console.log("No refresh token found for user:", userId); // Ако няма токен
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    if (storedRefreshToken.expiresAt < Date.now()) {
      console.log("Refresh token expired for user:", userId); // Ако токенът е изтекъл
      return res.status(403).json({ message: "Expired refresh token" });
    }

    console.log("Refresh token found, generating new access token...");
    const newAccessToken = signToken(userId);

    console.log("New access token generated:", newAccessToken); // Показва новия access token
    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.log("Error occurred during refresh:", err.message); // Ако има грешка
    res.status(403).json({ message: "Error refreshing token" });
  }
};


