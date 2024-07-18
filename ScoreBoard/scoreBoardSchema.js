const mongoose = require("mongoose");
const { Schema } = mongoose;
const rSchema = new Schema(
    {
       
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "events"
            },
            organizerId:{
              type: mongoose.Schema.Types.ObjectId,
              ref: "organizers"
            
            },
            date:{
              type: Date,
              required: true,
            },
        
        score: {
            type: Number,
            required:true

        }
        ,
        position: {
          type: String,
default:0
      }
      
    })
const reviews = mongoose.model("reviews", rSchema);
module.exports = reviews;