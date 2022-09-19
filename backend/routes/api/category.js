const express=require('express');
const categoryController = require('../../controllers/categoryController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middlewares/verifyRoles');
const verifyToken = require('../../middlewares/verifyToken');

const router=express.Router();


router.route('/')
     .post(verifyToken,verifyRoles(ROLES_LIST.Admin),categoryController.createCategory)
     .get(categoryController.getCategory);


router.put('/update',verifyToken,verifyRoles(ROLES_LIST.Admin),categoryController.updateCategory)
router.delete('/delete',verifyToken,verifyRoles(ROLES_LIST.Admin),categoryController.deleteCategory)
     


module.exports=router;