"use strict";
const mysql = require('mysql');
require("dotenv").config();
const { USER_PASSWORD, USER_NAME, HOST, DB_NAME, PORT_NUMBER } = process.env;
const connection = mysql.createConnection({
    host: HOST,
    user: USER_NAME,
    password: USER_PASSWORD,
    database: DB_NAME,
});
module.exports = connection;
