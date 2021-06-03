require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log(chalk.greenBright(`\n ================== \n Connected with DB\n ==================`))
};

module.exports = connectDB;
