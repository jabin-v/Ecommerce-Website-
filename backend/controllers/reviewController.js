const catchAsync = require("../util/catchAsync");
const Review=require('../model/Review');
const AppError = require("../util/appError");
const User = require("../model/User");


const createReview=catchAsync(async(req,res,next)=>{

    const username = req.user; //   ;req.user;

   

    const userId = await User.findOne({ username }).select("_id").exec();

    req.body.user=userId;
    

if(!req.body.product) req.body.product=req.params.productId;





    const newReview= await Review.create(req.body);

    res.status(200).json({
        status:"success",
        data:{
            newReview
        }})





    
})
const getAllReview=catchAsync(async(req,res,next)=>{

    let filter={};
    if(req.params.productId) filter={product:req.params.productId}

    const reviews=await Review.find(filter);


    res.status(200).json({
        status:"success",
        data:{
            reviews
        }
    })




})
const updateReview=catchAsync(async(req,res,next)=>{
    const review=await Review.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    if(!review) next(new AppError('No review found with that id',404))


    res.status(200).json({
        status:"success",
        data:{
            review
        }
    })
})

const deleteReview=catchAsync(async(req,res,next)=>{

const review=await Review.findByIdAndDelete(req.params.id);

if(!review) next(new AppError('No review found with that id',404))



    res.status(204).json({
        status:"deletion success",
       
    })

})


module.exports={
    createReview,
    getAllReview,
    updateReview,
    deleteReview
}