const Seller = require('../../Database/Schema/seller');
const Buyer = require('../../Database/Schema/buyer');
const SlotBooking = require('../../Database/Schema/slotBooking');
const { DefaultSlots } = require('../../configs/constants');

class BuyerModel {

    async Add(seller) {
        let buyerModel = new Buyer(seller);
        await buyerModel.save();
        return buyerModel
    }

    async List() {
        let buyerList = await Buyer.find();
        return { count: (sellerList.length), rows: buyerList };
    }

    async ListWithSlot() {
        let sellerList = await Seller.find();
        let slotBookingList = await SlotBooking.find();

        let sellerWithSlots = [];
        sellerList.forEach(async (seller, i) => {
            sellerWithSlots.push({ 'seller': seller, 'slots': slotBookingList.filter(slot => slot.sellerId == seller._id) });
        });
        return sellerWithSlots;
    }

    async Search(body) {
        const { _id } = body;
        let sellerList = await Seller.find({ _id });
        return { count: (sellerList.length), rows: sellerList };
    }

    async SearchByEmail(body) {
        let sellerList = await Seller.find(body);
        return { count: (sellerList.length), rows: sellerList };
    }

    async BookAppointment(body) {
        const { _id, sellerId, timeSlotID } = body;
        let bookingList = await SlotBooking.find({ _id, sellerId, timeSlotID });

        if (bookingList.length === 0)
            return { count: bookingList.length, message: "Sorry... No such slot found" };
        else if (bookingList.isTimeSlotBooked)
            return { count: bookingList.length, message: "Already Booked" }

        const updatedRecord = await SlotBooking.updateOne({ _id, sellerId, timeSlotID }, { isBookedForRequest: true });
        bookingList.isBookedForRequest = true

        return { count: (bookingList.length), rows: bookingList };
    }

}

module.exports = BuyerModel
