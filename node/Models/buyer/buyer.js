const Seller = require('../../Database/Schema/seller');
const Buyer = require('../../Database/Schema/buyer');
const SlotBooking = require('../../Database/Schema/slotBooking');
const { DefaultSlots } = require('../../Configs/constants');

class BuyerModel {

    async Add(seller) {
        let buyerModel = new Buyer(seller);
        await buyerModel.save();
        return buyerModel
    }

    async List() {
        let buyerList = await Buyer.find();
        return { count: (buyerList.length), rows: buyerList };
    }

    async Search(body) {
        const { _id } = body;
        let sellerList = await Buyer.find({ _id });
        return { count: (sellerList.length), rows: sellerList };
    }

    async SearchByEmail(body) {
        let sellerList = await Buyer.find(body);
        return { count: (sellerList.length), rows: sellerList };
    }

    async BookAppointment(body) {
        const { _id, sellerId, timeSlotID, buyerId } = body;
        let bookingList = await SlotBooking.find({ _id, sellerId, timeSlotID });

        if (bookingList.length === 0)
            return { count: bookingList.length, message: "Sorry... No such slot found" };
        else if (bookingList.isTimeSlotBooked)
            return { count: bookingList.length, message: "Already Booked" }

        const updatedRecord = await SlotBooking.updateOne({ _id, sellerId, timeSlotID }, { isBookedForRequest: true, buyerId: buyerId });
        bookingList.isBookedForRequest = true

        return { count: (bookingList.length), message: "Your appointment has been booked successfully" };
    }

    async AccpetedBooking(body) {
        const { _id, sellerId, timeSlotID, buyerId } = body;
        let bookingList = await SlotBooking.find({ _id, sellerId, timeSlotID });

        const updatedRecord = await SlotBooking.updateOne({ _id, sellerId, timeSlotID }, { isBookedForRequest: true, buyerId: buyerId });
    }

}

module.exports = BuyerModel
