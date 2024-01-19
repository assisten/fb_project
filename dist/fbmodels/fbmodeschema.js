"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userloginschema = new mongoose_1.default.Schema({
    Email: { type: String, required: true },
    Password: { type: String, required: true }
});
const userlogins = mongoose_1.default.model("emties", userloginschema);
exports.default = userlogins;
