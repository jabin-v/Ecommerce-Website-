const express=require('express');
const orderController = require('../../controllers/orderController');

const router=express.Router();


router.route('/')
     .post(orderController.createOrder)
     .get(orderController.getOrderByuser)
     .patch(orderController.updateOrder)
    
router.route('/order-pending').get(orderController.getAllOrders)

router.route("/stats").get(orderController.stats)
router.route("/delivered").get(orderController.getDelivered)
router.route("/alldelivered").get(orderController.AllDelivered)
router.route("/cancelorder").patch(orderController.deleteOrder)
router.route("/order-count").get(orderController.pendingOrderCount)
router.route("/income").get(orderController.getMonthlyIncome)
router.route("/getmonthwise").get(orderController.getMonthWiseIncome)
router.route("/productSlaes").get(orderController.productYearlySales)

     



module.exports=router;