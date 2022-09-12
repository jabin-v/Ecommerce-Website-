const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register=async(req,res,next)=>{

    const {username,password}=req.body;

   
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const createdUser = await User.create({
            "username": username,
            "password": hashedPwd
        });

        const roles=Object.values(createdUser.roles).filter(Boolean);

        

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": createdUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { "username": createdUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
    
    
        // saving refreshtoken with current user(1)
        createdUser.refreshToken = refreshToken;
        const result = await createdUser.save();
    
        // console.log(result)
    
    
    
    
        //create secure cookie with refresh token(2)
    
        res.cookie('jwt', refreshToken, { httpOnly: true,  sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });//secure: true,
        //for the frontenddev to store in memory
        res.status(201).json({
           data:{ roles,accessToken},
           message:`New user ${username} created!`
        })

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }



   

}