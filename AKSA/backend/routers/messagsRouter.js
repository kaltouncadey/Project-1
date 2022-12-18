const express = require("express");
const router = express.Router();

const messageRouter = require("../Controls_User/messages");
const { protect } = require("../middleware/Auth");

router.get("/post", protect,messageRouter.registers);



module.exports = router;

