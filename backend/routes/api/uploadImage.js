const express=require('express');
const uploadImage = require('../../controllers/uploadImage');
const imageUpload =require('../../middlewares/imageUploadCloud')

const router=express.Router();


router.route('/')
     .post(imageUpload,uploadImage.uploadImages)
     


module.exports=router;