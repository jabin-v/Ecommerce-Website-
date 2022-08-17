const mongoose=require('mongoose');

const Product=require('../model/Product')


const Schema=mongoose.Schema;

const reviewSchema=new Schema({

    review:{
        type:String,
        required:[true,'Review can not be empty']

    },

    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true,'review must belongs to a product']
    },
    user:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,'review must belongs to a user']

    }

  


},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

reviewSchema.index({product:1,user:1},{
    unique:true
})


reviewSchema.pre(/^find/,function(next){

    this.populate({
        path:"product",
        select:'name'
    }).populate({
        path:"user",
        select:"username"
    })


    next();

})

reviewSchema.statics.calcAverageRatings=async function(productId){
//this ==> current model
    const stats=await this.aggregate([
        {
            $match:{product:productId}
        },
        {
            $group:{
               _id:"product" ,
               nRatings:{$sum:1},
               avgRating:{$avg:"$rating"}
            }
        }
    ]);

    

    if(stats.length > 0){
        await Product.findByIdAndUpdate(productId,{
            ratingsAverage:stats[0].avgRating,
            ratingsQuantity:stats[0].nRatings,
        })
    }else{
        await Product.findByIdAndUpdate(productId,{
            ratingsAverage:0,
            ratingsQuantity:4.5,
        })
    }

 


}


reviewSchema.post('save',function(){
    //this ==>current review

    this.constructor.calcAverageRatings(this.product);


   
});


reviewSchema.pre(/^findOneAnd/,async function(next){
    this.r = await this.clone().findOne();



   
   next();
})

reviewSchema.post(/^findOneAnd/,async function(){
    console.log(this.r.product._id)
    await this.r.constructor.calcAverageRatings(this.r.product._id)

}
)










module.exports = mongoose.model('Review', reviewSchema);