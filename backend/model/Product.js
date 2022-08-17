const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema=new Schema({
    

    name: {
        type: String,
        required: true,
        trim:true
    },
    slug: {
        type: String,
        required: true,
        unique:true
    },
    description:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        required:true, 
        trim:true,
        
    },
    offers:{
        type:Number,

    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true

    },
    quantity:{
        type:Number,
        required:true

    },
    images: {
        type: Array,
    },
   
    availableSizes:{
        type: Array,

    },

   
    brand:{
        type:String
       },
    colors: { type: Array },
    ratingsAverage:{
        type:Number,
        default:4.5,
        min:[1,"RAting must be above 1.0"],
        min:[5,"RAting must be below 5.0"],
        set:val=>Math.round(val * 10 )/10
       },
       ratingsQuantity:{
        type:Number,
        default:0
       },
   
       brand:{
        type:String
       },
       activity:{
        type:Array     

    },
    isFeatured:{
        type:Boolean,
        default:false
    },
   
    updatedAt:Date,
   


} )


productSchema.set('toObject', { virtuals: true })
productSchema.set('toJSON', { virtuals: true })

productSchema.index({price:1,ratingsAverage:-1})

productSchema.virtual('reviews',{
    ref:"Review",
    foreignField:'product',
    localField:"_id"
})


module.exports = mongoose.model('Product', productSchema);