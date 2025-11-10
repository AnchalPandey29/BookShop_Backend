// backend/models/OrderModel.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true }, // razorpay order id
    receipt: { type: String },
    amount: { type: Number, required: true }, // paise
    currency: { type: String, default: "INR" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    razorpayPaymentId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
