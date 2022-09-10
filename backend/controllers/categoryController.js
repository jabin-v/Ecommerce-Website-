const Category = require("../model/Category");
const slugify = require("slugify");
const catchAsync = require("./../util/catchAsync");

function createCategories(categories, parentId = undefined) {
  const categoryList = [];
  let category;

  //if parentId is null means it is parent itself

  if (!parentId) {
    category = categories.filter((item) => item.parentId === undefined);

    //this will create parent categories
  } else {
    category = categories.filter((item) => item.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

const createCategory = catchAsync(async (req, res, next) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const newCategory = await Category.create(categoryObj);

  res.status(201).json({
    status: "success",
    data: newCategory,
  });
});

const getCategory = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  if (categories) {
    const categorylist = createCategories(categories);

    res.status(200).json({
      status: "success",
      data: categorylist,
    });
  }
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { updatesList } = req.body;

  

  const updatedCategoryList = [];

  updatesList.forEach(async (item) => {
    const category = {
      name: item.name,
      parentId: item.parentId ? item.parentId : undefined,
      slug:slugify(item.name)
    };


    const categoryTest = await Category.findByIdAndUpdate(
      { _id: item.value },
      category,

      { new: true }
    );

    
  });

 

  return res.status(200).json({
    status: "success",
    data: updatedCategoryList,
  });
});


const deleteCategory=catchAsync(async(req,res,next)=>{

    const {deleteList}=req.body

    deleteList.map(async(item,index)=>{
        await Category.findByIdAndDelete({_id:item._id})
    })
    


    res.status(200).json({
        status:"delete success",

    })

})

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
};
