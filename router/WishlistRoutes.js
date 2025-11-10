// backend/routes/wishlistRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/AuthMiddleware");
const { add, remove, getMine } = require("../controller/WishlistController");

router.post("/", verifyToken, add);
router.get("/me", verifyToken, getMine);
router.delete("/:bookId", verifyToken, remove);

module.exports = router;
