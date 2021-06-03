const express = require('express')
const router = express.Router()
const buyerController = new (require('../Controllers/Buyer/buyer'))();
// const sellerValidator = require('../../Middlewares/Validators/Seller/seller')();
// const AdminAuthentication = new (require('../../Middlewares/authMiddleware'))().adminAuthentication;

router.route('/create')
    .post(buyerController.Add);

router.route('/list')
    .get(buyerController.List);

router.route('/search')
    .post(buyerController.Search);

router.route('/search-by-email')
    .post(buyerController.SearchByEmail);

router.route('/list-seller-with-slot')
    .get(buyerController.ListWithSlot);

router.route('/book-appointment')
    .post(buyerController.BookAppointment);

router.route('/accpeted-booking')
    .post(buyerController.AccpetedBooking);

module.exports = router
