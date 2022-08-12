const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    slug: {
        type: String,
        required: true,
        unique:true
    },
    type:{
        type:String
    },
    parentId:{
        type:String
    }
});

module.exports = mongoose.model('Category', categorySchema);