"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var book_router_1 = require("./src/router/book.router");
var PORT = process.env.PORT || 3000;
var app = (0, express_1["default"])();
app.set("view engine", "ejs");
app.set('views', './src/views');
var DB_URL = "mongodb+srv://root:Password@cluster0.4svhi.mongodb.net/dbTest?retryWrites=true&w=majority";
console.log(DB_URL, "DB_URL");
mongoose_1["default"].connect(DB_URL)
    .then(function () { return console.log('DB Connected!'); })["catch"](function (error) { return console.log('DB connection error:', error.message); });
app.use(body_parser_1["default"].json());
app.use('/book', book_router_1["default"]);
app.listen(PORT, function () {
    console.log("App running on port: " + PORT);
});
