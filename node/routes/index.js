const router = require('express').Router();
module.exports = app => {
    app.get('/', (req, res) => {
        res.status(STATUS_CODES.SUCCESS)
            .send("Welcome to" + process.env.PROJECT_NAME)
    })

    // app.use("/buyer", require('./buyer'))
    app.use("/seller", require('./seller'))
    app.use("/buyer", require('./buyer'))
}
