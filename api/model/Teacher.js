const mongoose=require('mongoose')
const teacherSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    phone:Number,
    email:String,
    userType:String
});

module.exports=mongoose.model('teachers',teacherSchema)