"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_routes_1 = __importDefault(require("./handlers/user_routes"));
var product_routes_1 = __importDefault(require("./handlers/product_routes"));
var order_routes_1 = __importDefault(require("./handlers/order_routes"));
var app = (0, express_1.default)();
var address = "0.0.0.0:3000";
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
(0, user_routes_1.default)(app);
(0, product_routes_1.default)(app);
(0, order_routes_1.default)(app);
app.listen(3000, function () {
    console.log("Starting app on: " + address);
});
exports.default = app;
