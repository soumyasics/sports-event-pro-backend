const mongoose=require("mongoose");

const tmSchema=mongoose.Schema({

    memberId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teammembers',
        required:true
    },
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
 

  
});
module.exports=mongoose.model('teamplayers',tmSchema)
