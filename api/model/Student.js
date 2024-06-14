const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    address:String,
    phone:Number
});
module.exports=mongoose.model("Students",studentSchema);