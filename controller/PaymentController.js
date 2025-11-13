const { razorpayInstance } = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/OrderModel");
const Purchase = require("../models/PurchaseModel");

// Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { amount, bookId } = req.body;
    const userId = req.user?.id || "guest";

    console.log(req.body);
    

    const options = {
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    // Save the order in DB
    const newOrder = new Order({
      orderId: order.id,
      receipt: order.receipt,
      amount: order.amount,
      currency: order.currency,
      user: userId,
      book: bookId,
      status: "created",
    });
    await newOrder.save();

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Update order status
      const order = await Order.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          status: "paid",
        },
        { new: true }
      );

      // Save purchase info
      const newPurchase = new Purchase({
        buyer: req.user?.id || "guest",
        book: bookId,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        amount: order.amount / 100,
        status: "Completed",
      });
      await newPurchase.save();

      res.status(200).json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
