const express=require("express");

const refreshController=require('../controllers/refreshToken-controller');
const router=express.Router();



router.get('/',refreshController.handleRefreshToken)

module.exports=router