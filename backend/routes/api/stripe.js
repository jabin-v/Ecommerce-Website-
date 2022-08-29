const router=require("express").Router();
const paymentController = require('../../controllers/paymentController');


router.route('/payment').post(paymentController.payment)


module.exports = router;