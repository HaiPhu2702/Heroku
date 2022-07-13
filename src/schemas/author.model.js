"use strict";
exports.__esModule = true;
exports.Author = void 0;
var mongoose_1 = require("mongoose");
var authorSchema = new mongoose_1.Schema({
    name: String
});
var Author = (0, mongoose_1.model)('Author', authorSchema);
exports.Author = Author;
