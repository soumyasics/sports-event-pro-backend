const mongoose=require("mongoose");

const tmSchema=mongoose.Schema({
    coachId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teamcoaches',
       
        required:true,
    },
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
    pincode:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    }, 
    photo:{
        type:Object
    }
});
module.exports=mongoose.model('teammembers',tmSchema)
