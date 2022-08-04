const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login=async(req,res,next)=>{
    

    const {username,password}=req.body;
    let foundUser;





    try {

        foundUser=await User.findOne({username:username});


        
    } catch (error) {
           console.log(error)
        
    }

    if(!foundUser){
        return res.status(401); //unuthorized
    }

    //get user roles 
   

    const isPasswordCorrect=bcrypt.compareSync(password,foundUser.password);

    if(!isPasswordCorrect){

        return res.status(400).json({
            message:"invalid username or password"
        })
    }

    const roles=Object.values(foundUser.roles);

    console.log(roles)

   
     //create
     const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' }
    );
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );


    // saving refreshtoken with current user(1)
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    console.log(result)




    //create secure cookie with refresh token(2)

    res.cookie('jwt', refreshToken, { httpOnly: true,  sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });//secure: true,
    //for the frontenddev to store in memory
    res.json({roles,accessToken})

    

}