const Product = require("../model/Product");
const slugify = require("slugify");
const catchAsync = require("../util/catchAsync");
const APIFeatures = require("../util/APIFeatures");
const { findByIdAndDelete } = require("../model/User");

//-----------------product create--------------------------//

const createProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    price,
    category,
    description,
    response,
    quantity,
    sizes,
    brand,
    colors,
    offers,
    activity,
    isFeatured,
  } = req.body;

 


  const productObj = {
    name,
    slug: slugify(name),
    price,
    images: response,
    category,
    description,
    colors,
    availableSizes: sizes,
    quantity,
    brand,
    activity,
    offers,
    isFeatured,

    updatedAt: new Date(),
  };
  const newProduct = await Product.create(productObj);

  res.status(201).json({
    status: "success",
    product: newProduct,
  });
});

//-----------------product create--------------------------//

//---------Admin Product request--------------------//

const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find()
    .populate({
      path: "category",
      select: "-__v -parentId ",
    })
    .sort("-updatedAt");

  res.status(200).json({
    status: "success",
    data: products,
  });
});

//---------Admin Product request--------------------//

//============ frontend customer===============================//

const aliasTopCheapProduct = catchAsync(async (req, res, next) => {
  req.query.limit = "8";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,images";
  next();
});
const aliasFeaturedProduct = catchAsync(async (req, res, next) => {
  req.query.isFeatured = "true";
  req.query.limit = "8";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,images";
  next();
});

const getAllProductsCustomer = catchAsync(async (req, res, next) => {

  console.log(req.query)

  

  


  req.query.fields = "name,price,ratingsAverage,images";


  const features = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sort()
    .limit()
    .paginate();

  const products = await features.query;




 

  //SEND QUERY
  res.status(200).json({
    status: "success",
    result: products.length,
    data: products,
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate({ path: "category", select: "-__V" })
    .populate("reviews");

  res.status(201).json({
    status: "success",

    data: product,
  });
});

const removeImage=catchAsync(async(req,res,next)=>{



 

  const product=await Product.findByIdAndUpdate(req.body.id,
    { $pull: { images:  {url:req.body.image} } }
  ,{
    new:true,
    runValidators:true
    
  })

  res.status(200).json({
    status: "successfully updated product",
    data:{
      product
    }
  });

})

const updateProduct = catchAsync(async (req, res, next) => {

 

  const {
    name,
    price,
    category,
    description,
    response,
    quantity,
    sizes,
    brand,
    colors,
    offers,
    activity,
    isFeatured,
  } = req.body;

 


  const productObj = {
    name,
    slug: slugify(name),
    price,
    images: response,
    category,
    description,
    colors,
    availableSizes: sizes,
    quantity,
    brand,
    activity,
    offers,
    isFeatured,

    updatedAt: new Date(),
  };
  

  const product=await Product.findByIdAndUpdate(req.body.id,{...req.body,slug:slugify(req.body.name)},{
    new:true,
    runValidators:true
  })


  res.status(200).json({
    status: "successfully updated product",
    data:{
      product
    }
  });
});


const deleteProduct=catchAsync(async(req,res,next)=>{

  


const deleted=await Product.findByIdAndDelete(req.body.id)


  res.status(204).json("deleted suuceessfully")
})


//=======================aggregation=======================================//
const productStats = catchAsync(async (req, res, next) => {
  const property = req.params.property;

  const stats = await Product.aggregate([
    {
      $unwind: `$${property}`,
    },
    {
      $group: {
        _id: `$${property}`,
        num: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

// product group by property

const ProductsStatsByPropery = catchAsync(async (req, res, next) => {
  const { property } = req.body;

  const stats = await Product.aggregate([
    {
      $group: {
        _id: `$${property}`,
        num: { $sum: 1 },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

// ====================Nested Route==========================//

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getAllProductsCustomer,
  aliasTopCheapProduct,
  aliasFeaturedProduct,
  productStats,
  ProductsStatsByPropery,
  deleteProduct,
  removeImage
};
