const mongoose=require("mongoose")

const Adminschema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
});

module.exports=mongoose.model('admin',Adminschema)