const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    title:String,
    description:String
},
{
    timestamps:true, versionKey:false
})

module.exports = mongoose.model('tag',tagSchema)