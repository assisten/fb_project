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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMachines = exports.createMachine = void 0;
const machine_model_1 = __importDefault(require("../models/machine.model"));
const createMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMachine = yield machine_model_1.default.create(req.body);
        res.status(200).json({
            success: true,
            message: "machine created succsesfully",
            data: newMachine
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "machine not created"
        });
    }
});
exports.createMachine = createMachine;
const findMachines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getMachines = yield machine_model_1.default.find();
        return res.status(200).json({
            success: true,
            data: getMachines,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});
exports.findMachines = findMachines;
