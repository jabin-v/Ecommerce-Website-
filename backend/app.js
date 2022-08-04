require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const cors=require("cors");
const cookieParser=require('cookie-parser');
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/mongoConnection');

//Connect to mongodb
connectDB();



const registerRoute=require('./routes/register');
const authRoute=require('./routes/auth');
const refreshRouter=require('./routes/refresh-routes');
const logoutRouter=require('./routes/logout-routes');
const employeesRouter=require('./routes/api/employee');
const userRouter=require('./routes/api/user');
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");
const { verifyToken } = require('./middlewares/verifyToken');


//Hanlde optiond credentials check -before CORS
//and fetch cookies credential requirement

app.use(credentials)



// cross origin resource sharing
app.use(cors(corsOptions));



//handle form data

app.use(express.urlencoded({extended:false}))

//handle json

app.use(express.json());


//cookies

app.use(cookieParser());


app.use('/api/register',registerRoute);
app.use('/api/auth', authRoute);
app.use('/api/refresh',refreshRouter)
app.use('/api/logout',logoutRouter)

app.use(verifyToken);
app.use('/api/employees',employeesRouter );
app.use('/users', userRouter);

app.use(errorHandler)




mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// oLyKANI2tGAUeIaO