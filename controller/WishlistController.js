// backend/controller/WishlistController.js
const Wishlist = require("../models/WishListModel");
const User = require("../models/UserModel");

const add = async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!bookId) return res.status(400).json({ message: "bookId required" });

    const mongoUser = await User.findOne({ firebaseUid: req.user.uid });
    if (!mongoUser) return res.status(404).json({ message: "User not found" });

    const exists = await Wishlist.findOne({ user: mongoUser._id, book: bookId });
    if (exists) return res.status(200).json({ success: true, message: "Already in wishlist" });

    const w = await Wishlist.create({ user: mongoUser._id, book: bookId });
    res.json({ success: true, wishlist: w });
  } catch (err) {
    console.error("Wishlist add err:", err);
    // handle duplicate key error gracefully
    if (err.code === 11000) return res.status(200).json({ success: true, message: "Already in wishlist" });
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const { bookId } = req.params;
    const mongoUser = await User.findOne({ firebaseUid: req.user.uid });
    if (!mongoUser) return res.status(404).json({ message: "User not found" });

    await Wishlist.findOneAndDelete({ user: mongoUser._id, book: bookId });
    res.json({ success: true, message: "Removed" });
  } catch (err) {
    console.error("Wishlist remove err:", err);
    res.status(500).json({ message: err.message });
  }
};

const getMine = async (req, res) => {
  try {
    const mongoUser = await User.findOne({ firebaseUid: req.user.uid });
    if (!mongoUser) return res.status(404).json({ message: "User not found" });

    const list = await Wishlist.find({ user: mongoUser._id }).populate("book");
    res.json({ success: true, count: list.length, list });
  } catch (err) {
    console.error("Wishlist get err:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { add, remove, getMine };
