const User = require("../models/user");

const mongoose = require("mongoose");

exports.userById = async (req, res, next, userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      error: "Invalid user ID",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    req.profile = user;
    next();
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};
