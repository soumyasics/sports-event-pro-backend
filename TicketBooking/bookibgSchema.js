const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tickets',
        required: true
    },
    ticketCount: {
        type: Number,
        required: true,
     
    },
    amount: {
        type: Number,
        required: true,
      
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events', 
        required: true
    },
    viewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'viewers',
        required: true
    },
    paymentStatus:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

const Ticket = mongoose.model('tickeetbookings', ticketSchema);

module.exports = Ticket;
