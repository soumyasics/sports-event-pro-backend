const mongoose=require("mongoose");

const tmSchema=mongoose.Schema({
    coachId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teamcoaches',
        required:true
       
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'events',
        required:true
       
    },
    approvalStatus:{
        type:String,
        
        default:'pending',
       
    },
    organizerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'organizers',
        required:true
    },
    date:{
        type:Date,
        required:true
    },score:{
        type:Number,
        default:0
    },
    position:{
        type:String,
        
        default:'',
    }

  
});
module.exports=mongoose.model('eventenrollments',tmSchema)
