const AppError = require("../util/appError")
const catchAsync = require("../util/catchAsync")
const fs = require("fs");

module.exports = catchAsync(async function(req,res,next){

    if(!req.files || Object.values(req.files).flat().length === 0){
        return next(new AppError(`can't find any files`,404))
    }

     let files=Object.values(req.files).flat();

     files.forEach((file) => {
        if (
          file.mimetype !== "image/jpeg" &&
          file.mimetype !== "image/png" &&
          file.mimetype !== "image/gif" &&
          file.mimetype !== "image/webp"
        ) {
          removeTmp(file.tempFilePath);
          return next(new AppError(`"Unsupported format.`,404))
        }
        if (file.size > 1024 * 1024 * 5) {
          removeTmp(file.tempFilePath);
          return next(new AppError(`File size is too large`,404))
          
        }
      });


    // console.log(Object.values(req.files).flat());

    

    next()


})

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  };