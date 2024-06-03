const mongoose= require("mongoose");

const OrganizerSchema=mongoose.Schema({
    name:{
        type:String,
       
        required:true,
       
    },
    
    address:{
        type:String,
        
        required:true,
       
    },
    pincode:{
        type:Number,
        required:true,
       
    },
   
    city:{
        type:String,
        required:true
    },
   
    state:{
        type:Object,
        required:true

    },
    country:{
        type:Object,
        required:true

    },
    contact:{
        type:Number,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    organizerlicense:{
        type:Object,
        required:true
    },
    experience:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    isActive:{
        type:String,
    default:'pending'
    }
   
});
module.exports=mongoose.model('OrganizerSchema',OrganizerSchema)

