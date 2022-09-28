const router=require("express").Router();
const paymentController = require('../../controllers/paymentController');
const verifyToken = require('../../middlewares/verifyToken');


router.route('/payment').post(verifyToken,paymentController.payment)


module.exports = router;