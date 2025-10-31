const express = require("express");
const router = express.Router();

const {register, getUser} =require("../controller/AuthController");
const { verifyToken } = require("../middleware/AuthMiddleware");


router.post("/",verifyToken, register);
router.get("/",verifyToken,getUser);

module.exports = router;

