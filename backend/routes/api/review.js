const express=require('express');
const reviewController = require('../../controllers/reviewController');

const router=express.Router({mergeParams:true});


router.route('/')
     .post(reviewController.createReview)
     .get(reviewController.getAllReview)


     router.route('/:id')
     .patch(reviewController.updateReview)
     .delete(reviewController.deleteReview)
     



     


module.exports=router;