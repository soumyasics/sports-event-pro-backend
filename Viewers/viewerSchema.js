const mongoose= require("mongoose");

const vSchema=mongoose.Schema({
    firstname:{
        type:String,
       
        required:true,
       
    },
    lastname:{
        type:String,
      
        required:true,
       
    },
    contact:{
        type:String,
        
        required:true,
       
    },
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    aadhar:{
        type:Number,       
        required:true,
       
    },
    password:{
        type:String,
        required:true
    },
   
    housename:{
        type:String,
        required:true

    },
    street:{
        type:String,
        required:true

    },
    state:{
        type:String,
        required:true

    },
    nationality:{
        type:String,
        required:true

    },pincode:{
        type:Number,
        required:true

    },
    dob:{
        type:Date,
        required:true

    },
    gender:{
        type:String,
        required:true

    }
});
module.exports=mongoose.model('viewers',vSchema)

