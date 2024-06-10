const mongoose= require("mongoose");

const Enquiryschema=mongoose.Schema({
    name:{
        type:String,
       
        required:true,
       
    },
    
    email:{
        type:String,

        required:true,
       
    },
    contactnumber:{
        type:String,
        required:true,
       
    },
   
    message:{
        type:String,
        required:true
    },
   Enquirytype:{
    type:String,

   }


});













module.exports=mongoose.model('Enquiry',Enquiryschema)

