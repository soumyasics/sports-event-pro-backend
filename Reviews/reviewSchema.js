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
        
        review: {
            type: String,
            required:true

        }
      
    })
const reviews = mongoose.model("reviews", rSchema);
module.exports = reviews;