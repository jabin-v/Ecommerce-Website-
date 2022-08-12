const catchAsync = require("../util/catchAsync");

const cloudinary = require("cloudinary");
const fs = require("fs");
const path = require("path");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
exports.uploadImages = catchAsync(

    async (req, res) => {
      
        
          const { path } = req.body;
          let files = Object.values(req.files).flat();
          let images = [];
          for (const file of files) {
            const url = await uploadToCloudinary(file, path);
            images.push(url);
            removeTmp(file.tempFilePath);
          }
          
          res.json(images);

         
       
        
        
      }
)


const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return next (new AppError("Upload image failed.",400 ))

         
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
