const User = require("../models/UserModel");

// Register or update user
const register = async (req, res) => {
  try {
    const firebaseUid = req.user.uid; 
    const { name, email, picture, phone_number } = req.user;
    console.log(req.user);
    

    if (!firebaseUid || !email)
      return res.status(400).json({ message: "Missing required fields" });

    const user = await User.findOneAndUpdate(
      { firebaseUid },
      {
        firebaseUid,
        name: name || req.body.name,
        email,
        photoURL: picture || req.body.photoURL,
        phoneNumber: phone_number || req.body.phoneNumber,
        location: req.body.location,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Fetch user details
const getUser = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;
    const user = await User.findOne({ firebaseUid });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//login method
const login = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please sign up first." });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};


module.exports = { register, getUser,login };
