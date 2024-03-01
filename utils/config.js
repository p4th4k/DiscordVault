const dotenv = require("dotenv").config();

const TOKEN = process.env.TOKEN;
const PORT = process.env.PORT;

module.exports = {
    TOKEN,
    PORT
}