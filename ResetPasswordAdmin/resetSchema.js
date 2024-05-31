const mongoose= require("mongoose");

const ResetSchemaadmin=mongoose.Schema({
    
    email:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        unique:true,
        required:true,
       
    }
   


});













module.exports=mongoose.model('admin',ResetSchemaadmin)

