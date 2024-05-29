const mongoose= require("mongoose");

const Enquirycshema=mongoose.Schema({
    name:{
        type:String,
       
        required:true,
       
    },
    
    email:{
        type:String,
        unique:true,

        required:true,
       
    },
    contactnumber:{
        type:String,
        unique:true,
        required:true,
       
    },
   
    description:{
        type:String,
        required:true
    },
   


});













module.exports=mongoose.model('Enquiry',Enquirycshema)

