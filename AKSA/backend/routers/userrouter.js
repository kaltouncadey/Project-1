const express = require("express");
const router = express.Router();

const userrouter = require("../Controls_User/User_control");

router.get("/get", userrouter.getalldata); 
router.post("/post", userrouter.registers);
router.post("/login", userrouter.login);
router.put("/update/:userId", userrouter.updateuser);
router.get("/get/:userId", userrouter.getoneUser);
router.delete("/delete/:userId", userrouter.deleteuser);

// ========== chage role ======= //

router.put('/change/:userId',userrouter.changerole)

 
// module.exports.router; 
module.exports = router;
 
 