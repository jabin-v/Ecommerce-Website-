const express=require('express');
const uploadImage = require('../../controllers/uploadImage');
const imageUpload =require('../../middlewares/imageUploadCloud')
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middlewares/verifyRoles');

const router=express.Router();


router.route('/')
     .post(verifyRoles(ROLES_LIST.Admin),imageUpload,uploadImage.uploadImages)
     


module.exports=router;