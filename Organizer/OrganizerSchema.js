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
    experience:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    photo:{
        type:Object,
        required:true

    },
    organizerlicense:{
        type:Object,
        required:true
    },

    isActive:{
        type:Boolean,
        default:false
    },
    adminApproved:{
        type:Boolean,
    default:false
    }
   
});
module.exports=mongoose.model('organizers',OrganizerSchema)

