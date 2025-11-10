const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();


const userRoutes = require("./router/AuthRouter");
const bookRouter = require("./router/BookRouter");
const wishlistRouter = require("./router/WishlistRoutes")
const paymentRouter = require("./router/PaymentRoute");

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_SECRET);


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books", bookRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/wishlist", wishlistRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
