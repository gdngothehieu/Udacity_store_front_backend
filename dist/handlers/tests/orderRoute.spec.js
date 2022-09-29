"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var userRoute_spec_1 = require("./userRoute.spec");
var request = (0, supertest_1.default)(server_1.default);
describe("Testing Order Route", function () {
    it("Should create order with 'complete' status 201", function () {
        try {
            var order = {
                productId: 1,
                quantity: 5,
                userId: 1,
                status: "complete",
            };
            request
                .post("/orders")
                .send(order)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + userRoute_spec_1.token)
                .expect(201);
        }
        catch (e) {
            console.log(e);
        }
    });
    it("Should create order with status 201", function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    order = {
                        productId: 1,
                        quantity: 3,
                        userId: 1,
                        status: "active",
                    };
                    return [4 /*yield*/, request
                            .post("/orders")
                            .send(order)
                            .set("Accept", "application/json")
                            .set("Authorization", "Bearer " + userRoute_spec_1.token)
                            .expect(201)];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Should show current order by user with status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request
                            .get("/orders/current-by-user/1")
                            .set("Authorization", "Bearer " + userRoute_spec_1.token)
                            .expect(200)];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Should show complete order by user with status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request
                            .get("/orders/complete-by-user/1")
                            .set("Authorization", "Bearer " + userRoute_spec_1.token)
                            .expect(200)];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Should show order by its id with status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request
                            .get("/orders/2")
                            .set("Authorization", "Bearer " + userRoute_spec_1.token)
                            .expect(200)];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Should show all orders with status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request
                            .get("/orders")
                            .set("Authorization", "Bearer " + userRoute_spec_1.token)
                            .expect(200)];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    console.log(e_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Should add product to an order_id with status 201", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, response, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    data = {
                        product_id: 1,
                        quantity: 6,
                    };
                    return [4 /*yield*/, request
                            .post("/orders/1/products")
                            .send(data)
                            .set("Accept", "application/json")
                            .set("Authorization", "Bearer " + userRoute_spec_1.token)
                            .expect(201)];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    console.log(e_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Should get orders by order_id foreign key with status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request
                            .get("/orders/by_order_id/1")
                            .set("Authorization", "Bearer " + userRoute_spec_1.token)
                            .expect(200)];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_7 = _a.sent();
                    console.log(e_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});