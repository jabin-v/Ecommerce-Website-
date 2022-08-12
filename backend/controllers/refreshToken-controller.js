const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    //jwt rotation modification
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });



    const foundUser = await User.findOne({ refreshToken }).exec();


    //didnot found the user with the refresh token ==> means refresh token reuse
    //ie.. user already logout so deleted from db
    //delete all the refresh token in the db

    if (!foundUser) {
       

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async(err, decoded) => {
                if(err){
                    return res.sendStatus(403); //Forbidden 
                }
                const hackedUser=await User.findOne({username:decoded.username}).exec();
                hackedUser.refreshToken=[];
                const result=await hackedUser.save();
                // console.log(result)



            }
            
            
            )


            return res.sendStatus(403); //Forbidden 
        }

        //the else case ie we found the user remove the refresh token and reissue new one

        const  newRefreshTokenArray=foundUser.refreshToken.filter(rt=>rt !== refreshToken);



    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if(err){
                //ie the token expired in the mean tym
                // console.log("identified an expired rtk")
                foundUser.refreshToken=[...newRefreshTokenArray];
                const result=await foundUser.save();
                // console.log(result)
            }
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

            //refresh token still valid
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10h' }
            );
            
            const newRefreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken =[...newRefreshTokenArray,newRefreshToken]
            const result = await foundUser.save();
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.json({ roles, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }