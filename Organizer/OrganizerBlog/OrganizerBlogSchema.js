const mongoose= require("mongoose");

const OrganizerblogSchema=mongoose.Schema({
    title:{
        type:String,
       
        required:true,
       
    },
    
    image:{
        type:Object,
        required:true,
    },
    description:{
        type:String,
        required:true,
       
    },
   
    organizerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'organizers',
        required:true
    },

   
});
module.exports=mongoose.model('blogs',OrganizerblogSchema)

