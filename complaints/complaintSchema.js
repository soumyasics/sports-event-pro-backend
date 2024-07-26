const mongoose = require("mongoose");
const { Schema } = mongoose;
const complaintSchema = new Schema(
    {
       
      name: {
            type: String,
           
            },
            userRole: {
                type: String,
               
                },
           date:{
              type: Date,
              required: true,
            },
        
        complaint: {
            type: String,
            required:true

        },
        organizerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'organizers',
        },
    })
const complaint = mongoose.model("complaints", complaintSchema);
module.exports = complaint;