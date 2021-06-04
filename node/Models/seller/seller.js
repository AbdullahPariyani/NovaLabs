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

    async AllAppointment(body) {
        let bookingList = await SlotBooking.find({ isTimeSlotBooked: false, isBookedForRequest: true, sellerId: body.sellerId });

        let tempBuyerDetails, newArray = JSON.parse(JSON.stringify(bookingList));
        for (let i = 0; i < newArray.length; i++) {
            tempBuyerDetails = await Buyer.find({ _id: newArray[i].buyerId });
            newArray[i].firstName = tempBuyerDetails[0].firstName;
            newArray[i].lastName = tempBuyerDetails[0].lastName;
            newArray[i].email = tempBuyerDetails[0].email;
        }

        return { count: (bookingList.length), rows: newArray };
    }

    async AcceptRejectAppointment(body) {
        const { _id, accepted } = body;
        let slotBookItem = await SlotBooking.find({ _id });

        if (!slotBookItem || slotBookItem.length === 0)
            return { count: slotBookItem.length, message: "Sorry... No such slot found" };
        else if (slotBookItem[0].isTimeSlotBooked)
            return { count: slotBookItem.length, message: "Already Booked" }
        else if (!slotBookItem[0].isBookedForRequest)
            return { count: slotBookItem.length, message: "Please create slot book request first" }

        let updateValue = { isTimeSlotBooked: true };
        if (!accepted) {
            updateValue = { isTimeSlotBooked: true, isBookedForRequest: false }
        }
        const updatedRecord = await SlotBooking.updateOne({ _id }, updateValue);
        const responseMsg = accepted ? 'Accepted' : 'Rejected'

        return { count: (slotBookItem.length), message: `${responseMsg} Successfully` };
    }

    async Login(body) {
        let { email, password } = body;
        let authenticate = await Seller.find({ email, password });

        if (authenticate.length === 0)
            return false;

        return authenticate;
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
