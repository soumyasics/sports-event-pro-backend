const mongoose=require("mongoose");

const tmSchema=mongoose.Schema({
    organizerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'organizers',
       
        required:true,
    },
    name:{
        type:String,
       
        required:true,
       
    },
    venue:{
        type:String,
        
        required:true,
       
    },
    date:{
        type:Date,
       
        required:true,
       
    },
    time:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
  
    banner:{
        type:Object,
        required:true
    }, 
    adminApprved:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('events',tmSchema)
