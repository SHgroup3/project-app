const User = require('../models/userModel.js');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });}
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });}
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });}
    res.status(200).json({
      message: "Login successful",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

