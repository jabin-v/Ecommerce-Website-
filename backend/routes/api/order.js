const express=require('express');
const orderController = require('../../controllers/orderController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middlewares/verifyRoles');
const verifyToken = require('../../middlewares/verifyToken');

const router=express.Router();


router.route('/')
     .post(verifyToken,orderController.createOrder)
     .get(verifyToken,orderController.getOrderByuser)
     .patch(verifyToken,verifyRoles(ROLES_LIST.Admin),orderController.updateOrder)
    


router.route("/stats").get(verifyToken,verifyRoles(ROLES_LIST.Admin),orderController.stats)
router.route("/delivered").get(verifyToken,orderController.getDelivered)
router.route("/alldelivered").get(verifyToken,orderController.AllDelivered)
router.route("/cancelorder").patch(verifyToken,orderController.deleteOrder)
router.route("/order-count").get(verifyToken,verifyRoles(ROLES_LIST.Admin),orderController.pendingOrderCount)
router.route("/income").get(verifyToken,verifyRoles(ROLES_LIST.Admin),orderController.getMonthlyIncome)
router.route("/getmonthwise").get(verifyToken,verifyRoles(ROLES_LIST.Admin),orderController.getMonthWiseIncome)
router.route("/productSlaes").get(verifyToken,verifyRoles(ROLES_LIST.Admin),orderController.productYearlySales)

     



module.exports=router;