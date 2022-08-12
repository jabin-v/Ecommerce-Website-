const express=require('express');
const categoryController = require('../../controllers/categoryController');

const router=express.Router();


router.route('/')
     .post(categoryController.createCategory)
     .get(categoryController.getCategory);


router.put('/update',categoryController.updateCategory)
router.delete('/delete',categoryController.deleteCategory)
     


module.exports=router;