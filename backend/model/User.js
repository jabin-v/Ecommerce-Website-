const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        
        
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: [String],
    address:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model('User', userSchema);