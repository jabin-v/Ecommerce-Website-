const Product=require('../model/Product')
const slugify=require('slugify');
const catchAsync = require("../util/catchAsync");

const createProduct=catchAsync
(async(req,res,next)=>{

    

    const {name,price,category,description,response,quantity}=req.body;
    console.log("controller",response)
   

    const productObj={
        name,
        slug:slugify(name),
        price,
        images:response,
        category,
        description,
        quantity,
        updatedAt:new Date()


    };
    const newProduct= await Product.create(productObj);


    res.status(201).json({
        status:"success",
        product:newProduct
       
    })

    


    
})

const getAllProducts=catchAsync(async(req,res,next)=>{

   const products=await Product.find().populate({
    path:"category",
    select:"-__v -parentId "
   });



    res.status(201).json({
        status:"success",
        data:products
       
    })

})

//============Apply filters===============================//
const getAllProductsCustomer=catchAsync(async(req,res,next)=>{

   const products=await Product.find().



    res.status(201).json({
        status:"success",
        data:products
       
    })

})

const getProductById=catchAsync(async(req,res,next)=>{



   const product=await Product.findById(req.params.id);


    res.status(201).json({
        status:"success",
        data:product
       
    })



});


const updateProduct=catchAsync(async(req,res,next)=>{





    res.status(200).json({
        status:"successfully updated product"
    })
})


module.exports={
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct
}