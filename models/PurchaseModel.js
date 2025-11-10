const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  paymentId: { type: String },
  orderId: { type: String },
  amount: { type: Number },
  status: { type: String, default: "Completed" },
}, { timestamps: true });

module.exports = mongoose.model("Purchase", purchaseSchema);
