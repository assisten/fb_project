"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const machineSchema = new mongoose_1.default.Schema({
    machine: { type: String, required: true },
    production: { type: Number, required: true },
    watt_consumption: { type: Number, default: 0 },
    time: { type: Date, default: Date.now, },
    temperature: { type: Number },
    box: { type: Number },
    created_at: { type: Date, default: Date.now },
});
const Machine = mongoose_1.default.model("machines", machineSchema);
exports.default = Machine;
