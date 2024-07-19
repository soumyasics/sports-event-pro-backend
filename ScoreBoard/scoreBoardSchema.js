const mongoose = require("mongoose");
const { Schema } = mongoose;
const rSchema = new Schema(
  {

    enrollmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eventenrollments"
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events"
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizers"

    },
    tcId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teamcoaches"
    },
    date: {
      type: Date,
      required: true,
    },

    score: {
      type: Number,
      required: true

    }
    ,
    position: {
      type: String,
      default: 0
    }

  })
const reviews = mongoose.model("scoreboards", rSchema);
module.exports = reviews;