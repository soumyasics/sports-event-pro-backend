const mongoose=require("mongoose")

const TeamCoachLoginschema=mongoose.Schema({
    Username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
});

module.exports=mongoose.model('TeamCoachLogin',TeamCoachLoginschema)