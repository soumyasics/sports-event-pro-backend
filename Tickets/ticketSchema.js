const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    seatingCapacity: {
        type: Number,
        required: true
    },availableSeats: {
        type: Number,
        default:0
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        required: true
    },
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organizers',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tickets', TicketSchema);
