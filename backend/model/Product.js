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
    updatedAt:Date,
   


} ,{ timestamps: true })


module.exports = mongoose.model('Product', productSchema);