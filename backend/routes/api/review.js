const express=require('express');
const reviewController = require('../../controllers/reviewController');
const verifyToken = require('../../middlewares/verifyToken');

const router=express.Router({mergeParams:true});


router.route('/')
     .post(verifyToken,reviewController.createReview)
     .get(verifyToken,reviewController.getAllReview)


     router.route('/:id')
     .patch(verifyToken,reviewController.updateReview)
     .delete(verifyToken,reviewController.deleteReview)
     



     


module.exports=router;