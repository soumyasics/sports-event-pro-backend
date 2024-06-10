const mongoose= require("mongoose");

const tcSchema=mongoose.Schema({
    name:{
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
    address:{
        type:String,
        required:true,

    },
    city:{
        type:String,
        required:true,

    },
    country:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true
    },
   
    experience:{
        type:String,
        required:true

    },
    state:{
        type:String,
        required:true

    }, 
       category:{
        type:String,
        required:true

    },
    totalteammembers:{
        type:String,
        required:true

    },

    teamName:{
        type:String,
        required:true

    },
    profilePic:{
        type:Object,
    },
    certificate:{
        type:Object,
        required:true
    },
    isActive:{
        type:String,
    default:'pending'
    }
   
});
module.exports=mongoose.model('teamcoaches',tcSchema)

