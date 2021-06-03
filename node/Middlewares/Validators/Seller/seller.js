const { header, body } = require('express-validator');

exports.list = [
    header('authorization', 'authorization token is required!').trim().notEmpty(),
];

exports.add = [
    header('authorization', 'authorization token is required!').trim().notEmpty()
]


