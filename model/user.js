const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    Fname:{
        type:String,
        required:true
    },
    Lname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    }
})

module.exports=mongoose.model('User',UserSchema);