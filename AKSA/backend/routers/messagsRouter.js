const express = require("express");
const router = express.Router();

const messageRouter = require("../Controls_User/messages");


router.get("/get", messageRouter.getalldata);



module.exports = router;

