"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var bookRoutes = (0, express_1.Router)();
var book_model_1 = require("../schemas/book.model");
var multer_1 = require("multer");
var author_model_1 = require("../schemas/author.model");
var upload = (0, multer_1["default"])();
bookRoutes.get('/create', function (req, res) {
    res.render("createBook");
});
bookRoutes.post('/create', upload.none(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorNew, bookNew, p1, p2, _a, author, book, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                authorNew = new author_model_1.Author({
                    name: req.body.author
                });
                bookNew = new book_model_1.Book({
                    title: req.body.title,
                    description: req.body.description,
                    author: authorNew
                });
                bookNew.keywords.push({ keyword: req.body.keyword });
                p1 = authorNew.save();
                p2 = bookNew.save();
                return [4 /*yield*/, Promise.all([p1, p2])];
            case 1:
                _a = _b.sent(), author = _a[0], book = _a[1];
                if (book) {
                    res.render("success");
                }
                else {
                    res.render("error");
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                res.render("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
bookRoutes.post('/update', upload.none(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.log(req.body);
                return [4 /*yield*/, book_model_1.Book.findOne({ _id: req.body.id })];
            case 1:
                book = _a.sent();
                book.title = req.body.title;
                book.description = req.body.description;
                book.author = req.body.author;
                return [4 /*yield*/, book.save()];
            case 2:
                _a.sent();
                if (book) {
                    res.render("success");
                }
                else {
                    res.render("error");
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.render("error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
bookRoutes.get('/list', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, keywordFind, authordFind, author, books, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                query = {};
                if (req.query.keyword && req.query.keyword !== "") {
                    keywordFind = req.query.keyword || "";
                    query = {
                        "keywords.keyword": {
                            $regex: keywordFind
                        }
                    };
                }
                if (!(req.query.author && req.query.author !== "")) return [3 /*break*/, 2];
                authordFind = req.query.author || "";
                return [4 /*yield*/, author_model_1.Author.findOne({ name: { $regex: authordFind } })];
            case 1:
                author = _b.sent();
                query = __assign(__assign({}, query), { author: author });
                _b.label = 2;
            case 2: return [4 /*yield*/, book_model_1.Book.find(query).populate({
                    path: "author", select: "name"
                })];
            case 3:
                books = _b.sent();
                res.render("listBook", { books: books });
                return [3 /*break*/, 5];
            case 4:
                _a = _b.sent();
                res.render("error");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
bookRoutes.get('/update/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, book_model_1.Book.findOne({ _id: req.params.id })];
            case 1:
                book = _a.sent();
                console.log(book, 'book');
                if (book) {
                    res.render("updateBook", { book: book });
                }
                else {
                    res.render("error");
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.render("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
bookRoutes["delete"]('/delete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, book_model_1.Book.findOne({ _id: req.params.id })];
            case 1:
                book = _a.sent();
                if (!book) return [3 /*break*/, 3];
                return [4 /*yield*/, book.remove()];
            case 2:
                _a.sent();
                res.status(200).json({ message: "success" });
                return [3 /*break*/, 4];
            case 3:
                res.render("error");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                res.render("error");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports["default"] = bookRoutes;
