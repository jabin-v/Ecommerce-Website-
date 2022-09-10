const User = require('../model/User');
const catchAsync = require("./../util/catchAsync");

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const saveAddress=catchAsync(async(req,res,next)=>{

    const username = req.user;

    const userAddress=await User.findByIdAndUpdate({username},{
        address:req.body.address
    }).exec();

    req.json({ok:true})

})

const getStats=catchAsync(async(req,res,next)=>{
    const count= await User.aggregate([
        {
            $group:{
                _id:null,
                num:{$sum:1}
            }
        }
    ])

    res.json(count)


})


const stats=catchAsync(async(req,res,next)=>{

  
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
        {
            $sort:{
              _id:1
            }
          }
      ]);
      res.status(200).json(data)


})

   
  
    

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    saveAddress,
    getStats,
    stats
}