const mongoose = require("mongoose");
const { Schema } = mongoose;
const rSchema = new Schema(
    {
       
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "events"
            },
            tcId:{
              type: mongoose.Schema.Types.ObjectId,
              ref: "teamcoaches"
            
            },
            date:{
              type: Date,
              required: true,
            },
            viewerId:{
              type: mongoose.Schema.Types.ObjectId,
              ref: "viewers"
            
            },
        review: {
            type: String,
            required:true

        },
        userRole: {
          type: String,

      }
        ,
        rating: {
          type: Number,
default:0
      }
      
    })
const reviews = mongoose.model("reviews", rSchema);
module.exports = reviews;