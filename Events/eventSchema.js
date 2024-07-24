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
    price:{
        type:Object,
        required:true
    },
    adminApprved:{
        type:String,
        default:'Pending'
    },
    rating:{
        type:Number,
        default:0
    }
});
module.exports=mongoose.model('events',tmSchema)
