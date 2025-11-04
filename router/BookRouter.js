const express = require("express");

const router = express.Router();
const {addBook,getBooks} = require("../controller/BookController")

router.get("/",getBooks);
router.post("/",addBook);

module.exports = router;