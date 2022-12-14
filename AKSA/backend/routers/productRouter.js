const express = require('express')
const router = express.Router()

const {protect}= require('../middleware/Auth')

const products = require('../Controls_User/product')

router.post('/',protect,products.registers)
router.get('/',products.getalldata)
router.patch("/:T_id", products.updated);
router.delete("/delete/:T_id", products.deleteteach);
router.get("/get/:T_id", products.getoneteach);  



module.exports = router