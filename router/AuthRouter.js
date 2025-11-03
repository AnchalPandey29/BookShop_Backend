const express = require("express");
const router = express.Router();

const {register, getUser,login} =require("../controller/AuthController");
const {verifyToken} = require("../middleware/AuthMiddleware")


router.post("/",verifyToken, register);
router.get("/",verifyToken,getUser);
router.post("/login", verifyToken, login);

module.exports = router;

