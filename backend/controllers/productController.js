const Product = require("../model/Product");
const slugify = require("slugify");
const catchAsync = require("../util/catchAsync");
const APIFeatures = require("../util/APIFeatures");

//-----------------product create--------------------------//

const createProduct = catchAsync(async (req, res, next) => {
  const { name, price, category, description, response, quantity,sizes,brand,colors,offers ,activity,isFeatured} = req.body;
  console.log("controller", response);

  const productObj = {
    name,
    slug: slugify(name),
    price,
    images: response,
    category,
    description,
    colors,
    availableSizes:sizes,
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
  const products = await Product.find().populate({
    path: "category",
    select: "-__v -parentId ",
  });

  res.status(201).json({
    status: "success",
    data: products,
  });
});

//---------Admin Product request--------------------//

//============ frontend customer===============================//






const aliasTopProduct=catchAsync(async(req,res,next)=>{

req.query.limit="8";
req.query.sort ="-ratingsAverage,price";
req.query.fields="name,price,ratingsAverage,images";
next();

})
const aliasFeaturedProduct=catchAsync(async(req,res,next)=>{
req.query.isFeatured="true";
req.query.limit="8";
req.query.sort ="-ratingsAverage,price";
req.query.fields="name,price,ratingsAverage,images";
next();

})






const getAllProductsCustomer = catchAsync(async (req, res, next) => {

  

    
    // //BUILD QUERY

    // const queryObj={...req.query};


    // //FILTERING
    // const excludedFields=["page","sort","limit","fields"];

    // excludedFields.forEach(el=>delete queryObj[el])

    // //ADVANCED FILTERING
    // let queryStr=JSON.stringify(queryObj);
    // queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
    
    // let query =  Product.find(JSON.parse(queryStr));

   //SORTING

  //  if(req.query.sort){

  //     const sortBy=req.query.sort.split(',').join(' ');
  //      query.sort(sortBy);
  //      //in case there is tie sort('price ratingsAvg)
  //  }else{
  //   query.sort("-createdAt")
  //  }


   //LIMITING FIELD

  //  if(req.query.fields){
  //   const fields=req.query.fields.split(',').join(' ');

  //   query=query.select(fields)

  //  }else{
  //   query=query.select("-__v")
  //  }

  //  PAGINATION
  //  const page=req.query.page * 1 || 1 ;
  //  const limit=req.query.limit * 1 || 15;
  //  const skip=(page - 1 ) * limit;

  //  query=query.skip(skip).limit(limit);


  //  if(req.query.page){
  //   const numProducts=await Product.countDocuments();
  //   if(skip > numProducts){
  //     throw new Error('This page does not exist')
  //   }
  //  }




    
   

  

 //EXECUTE QUERY

 const features=new APIFeatures(Product.find(),req.query)
 .filter()
 .sort()
 .limit()
 .paginate()

  const products=await features.query;
  
  //SEND QUERY
  res.status(200).json({
    status: "success",
    result:products.length,
    data: products,
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(201).json({
    status: "success",
    
    data: product,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "successfully updated product",
  });
});

//=======================aggregation=======================================//












//=======================aggregation=======================================//





module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getAllProductsCustomer,
  aliasTopProduct,
  aliasFeaturedProduct
};
