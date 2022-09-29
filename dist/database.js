"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, MY_HOST = _a.MY_HOST, MY_DB = _a.MY_DB, MY_TEST_DB = _a.MY_TEST_DB, MY_USER = _a.MY_USER, MY_PASSWORD = _a.MY_PASSWORD, MY_ENV = _a.MY_ENV;
console.log(MY_ENV);
var Client;
if (MY_ENV === "test") {
    Client = new pg_1.Pool({
        host: MY_HOST,
        database: MY_TEST_DB,
        user: MY_USER,
        password: MY_PASSWORD,
    });
}
else {
    Client = new pg_1.Pool({
        host: MY_HOST,
        database: MY_DB,
        user: MY_USER,
        password: MY_PASSWORD,
    });
}
exports.default = Client;
