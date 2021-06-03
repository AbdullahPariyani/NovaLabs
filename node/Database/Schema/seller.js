const mongoose = require('mongoose');

const seller = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = Seller = mongoose.model('seller', seller);
