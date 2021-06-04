const mongoose = require('mongoose');

const slotBooking = new mongoose.Schema({
    sellerId: {
        type: String
    },
    timeSlotValue: {
        type: String
    },
    timeSlotID: {
        type: String
    },
    isTimeSlotBooked: {
        type: Boolean
    },
    isBookedForRequest: {
        type: Boolean
    },
    buyerId: {
        type: String
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        },
    },
});

module.exports = SlotBooking = mongoose.model('SlotBooking', slotBooking);
