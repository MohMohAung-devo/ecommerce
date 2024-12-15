const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

exports.signup = async (req, res) => {
  console.log("req.body", req.body);

  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    return res.status(400).json({
      err: errorHander(err),
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    if (!user.authenticated(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const { _id, name, email: userEmail, role } = user;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  } catch (err) {
    console.log("Request Body:", req.body);
    return res.status(500).json({
      error: "Somethin went wrong. Please try again latter",
    });
  }
};
