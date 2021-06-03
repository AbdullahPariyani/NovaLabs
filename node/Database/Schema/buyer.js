const mongoose = require('mongoose');

const buyer = new mongoose.Schema({
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

module.exports = Buyer = mongoose.model('buyer', buyer);

