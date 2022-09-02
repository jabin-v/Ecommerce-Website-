require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const bodyParser = require('body-parser')
const cors=require("cors");
const cookieParser=require('cookie-parser');
const errorHandler = require("./middlewares/errorHandler");
const AppError =require('./util/appError')
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/mongoConnection');
const fileUpload=require("express-fileupload")

//Connect to mongodb
connectDB();



const registerRoute=require('./routes/register');
const authRoute=require('./routes/auth');
const refreshRouter=require('./routes/refresh-routes');
const logoutRouter=require('./routes/logout-routes');
const employeesRouter=require('./routes/api/employee');
const userRouter=require('./routes/api/user');
//=====================================================//
const categoryRouter=require('./routes/api/category');
const productRouter=require('./routes/api/product');
const cartRouter=require('./routes/api/cart');
const reviewRouter=require('./routes/api/review');
const uploadImageRouter=require('./routes/api/uploadImage');
const orderRouter=require('./routes/api/order');
const stripeRouter=require("./routes/api/stripe")

const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");
const  verifyToken = require('./middlewares/verifyToken');
const  globalErrorHandler = require('./controllers/errorController');


//Hanlde optiond credentials check -before CORS
//and fetch cookies credential requirement

app.use(credentials)



// cross origin resource sharing
app.use(cors(corsOptions));


app.use( bodyParser.json({limit: '50mb'}))





//handle form data

app.use(express.urlencoded({extended:false}))


//file upload




app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//handle json

app.use(express.json());


//cookies

app.use(cookieParser());


app.use('/api/register',registerRoute);
app.use('/api/auth', authRoute);
app.use('/api/refresh',refreshRouter)
app.use('/api/logout',logoutRouter)
app.use('/api/products', productRouter);
app.use('/api/category', categoryRouter);

app.use('/api/upload',uploadImageRouter);











app.use(verifyToken);
app.use('/api/employees',employeesRouter );
app.use('/api/cart',cartRouter);
app.use('/api/users', userRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/order',orderRouter);
app.use('/api/reviews',reviewRouter);






// app.use('/api/users', userRouter);
// app.use('/api/category', categoryRouter);

// app.use('/api/cart',cartRouter); add back after check




app.all("*",(req,res,next)=>{
  

    // const err=new Error(`can't find ${req.originalUrl}`);
    // err.status='fail',
    // err.statusCode=404;
    // next(err);
   next(new AppError(`can't find ${req.originalUrl}`,404))
})

// =========global error handling=======

app.use(globalErrorHandler)


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// oLyKANI2tGAUeIaO