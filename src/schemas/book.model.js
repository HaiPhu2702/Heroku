"use strict";
exports.__esModule = true;
exports.Book = void 0;
var mongoose_1 = require("mongoose");
var keywordsSchema = new mongoose_1.Schema({
    keyword: String
});
var bookSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "Author" },
    keywords: [keywordsSchema]
});
var Book = (0, mongoose_1.model)('Book', bookSchema);
exports.Book = Book;
