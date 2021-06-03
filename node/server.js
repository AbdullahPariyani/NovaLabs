// PARSE .ENV
require('dotenv').config();

// FOR SERVER
const SHOULD_RUN_ON_HTTP = process.env.SHOULD_RUN_ON_HTTP;
const http = (SHOULD_RUN_ON_HTTP == 'true') ? require('http') : require('https');

const express = require('express') // NODE FRAMEWORK
const bodyParser = require('body-parser') // TO PARSE POST REQUEST
const cors = require('cors') // ALLOW CROSS ORIGIN REQUESTS
const port = process.env.PORT || 8000
const app = express();

// ---------------------------    SERVER CONFIGS ----------------------------------
require('./configs/globals'); // GLOBAL SETTINGS FILES

const server = (SHOULD_RUN_ON_HTTP == 'true') ? http.createServer(app) : http.createServer(options, app);

const connectDB = require('./configs/connection');
connectDB();

// ------------------------      GLOBAL MIDDLEWARES -------------------------
app.use(bodyParser.json()) // ALLOW APPLICATION JSON
app.use(bodyParser.urlencoded({ extended: false })) // ALLOW URL ENCODED PARSER
app.use(cors()) // ALLOWED ALL CROSS ORIGIN REQUESTS


// ------------------------    RESPONSE HANDLER    -------------------
app.use((req, res, next) => {
    const ResponseHandler = require('./configs/responseHandler')
    res.handler = new ResponseHandler(req, res);
    next()
});

// --------------------------    ROUTES    ------------------
const appRoutes = require('./routes')
appRoutes(app);

// --------------------------    GLOBAL ERROR HANDLER    ------------------
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    console.log(err);
    res.handler.serverError(err)
});

// --------------------------    START SERVER    ---------------------
server.listen(port, () => {
    console.log(chalk.greenBright(`\nServer started on ${chalk.white.bold(port)} :) \n`))
});
