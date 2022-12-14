const express = require("express");
const router = express.Router();

const userrouter = require("../Controls_User/techaers");
const { protect } = require("../middleware/Auth");

router.get("/get", userrouter.getalldata);
router.post("/post", protect,userrouter.registers);
router.put("/:teachid", userrouter.updated);
router.get("/get/:teachid", userrouter.getoneteach);   
router.delete("/delete/:teachid", userrouter.deleteteach);


module.exports = router; 
 

