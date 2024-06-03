const mongoose= require("mongoose");

const vSchema=mongoose.Schema({
    name:{
        type:String,
       
        required:true,
       
    },
    gender:{
        type:String,
        required:true

    },
    address:{
        type:String,
      
        required:true,
       
    },
    pincode:{
        type:Number,
        required:true

    },
    city:{
        type:String,
        required:true

    },
    state:{
        type:String,
        required:true

    },
    country:{
        type:String,
        required:true

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
    password:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('viewers',vSchema)

