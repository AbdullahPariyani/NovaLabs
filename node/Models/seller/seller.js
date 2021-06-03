const Seller = require('../../Database/Schema/seller');
const Buyer = require('../../Database/Schema/buyer');
const SlotBooking = require('../../Database/Schema/slotBooking');
const { DefaultSlots } = require('../../Configs/constants');

class SellerModel {
    async Add(seller) {
        let sellerModel = new Seller(seller);
        await sellerModel.save();
        this.slotBook(sellerModel.id)
        return sellerModel
    }

    async List() {
        let sellerList = await Seller.find();
        return { count: (sellerList.length), rows: sellerList };
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
        const { email } = body;
        let sellerList = await Seller.find({ email });
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

    async AllAppointment(body) {
        let bookingList = await SlotBooking.find({ isBookedForRequest: true });

        let tempBuyerDetails, newArray = JSON.parse(JSON.stringify(bookingList));
        for (let i = 0; i < newArray.length; i++) {
            tempBuyerDetails = await Buyer.find({ _id: newArray[i].buyerId });
            newArray[i].firstName = tempBuyerDetails[0].firstName;
            newArray[i].lastName = tempBuyerDetails[0].lastName;
            newArray[i].email = tempBuyerDetails[0].email;
            delete newArray[i].__v;
        }

        return { count: (bookingList.length), rows: newArray };
    }

    async slotBook(id) {
        Object.values(DefaultSlots.slotValue).forEach(async (slot, i) => {
            let slotModel = new SlotBooking({
                sellerId: id,
                timeSlotValue: slot,
                timeSlotID: DefaultSlots.slotId[i],
                isTimeSlotBooked: false,
                isBookedForRequest: false,
                buyerId: ''
            });
            await slotModel.save();
        });
    }
}

module.exports = SellerModel
