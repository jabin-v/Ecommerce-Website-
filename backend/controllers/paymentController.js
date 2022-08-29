const catchAsync = require("../util/catchAsync");
const KEY = process.env.STRIPE_SECRET_KEY
const stripe=require("stripe")(KEY);



const payment = catchAsync (async(req,res,next)=>{



    const total=req.body.amount;
    console.log("payment request recieved", total);

    const intent=await stripe.paymentIntents.create({
        amount:total * 100,
        currency:"inr",
        payment_method_types: ['card'],

    })

    res.json({client_secret: intent.client_secret});








})


module.exports = {
    payment
    
}