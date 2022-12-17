const express = require("express");
const router = express.Router();

const messageRouter = require("../Controls_User/messages");


router.get("/:userID", messageRouter.getoneteach);



module.exports = router;

