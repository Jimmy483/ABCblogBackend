const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const BlogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
})

module.exports=mongoose.Schema('Blog',BlogSchema);