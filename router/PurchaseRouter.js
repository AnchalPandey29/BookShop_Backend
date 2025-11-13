const express = require("express");
const router = express.Router();
const { getUserPurchases } = require("../controller/PurchaseController");
const { verifyToken } = require("../middleware/AuthMiddleware");

// ✅ Protected route
router.get("/my", verifyToken, getUserPurchases);

module.exports = router;
