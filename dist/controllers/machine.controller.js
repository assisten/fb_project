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
        // Extract data from the request body
        const { machine, production, watt_consumption, time, temperature, box } = req.body;
        // Create a new Machine instance
        const newMachine = new machine_model_1.default({
            machine,
            production,
            watt_consumption,
            time,
            temperature,
            box
        });
        // Save the new machine document to the database
        yield newMachine.save();
        // Respond with a success message and the created machine data
        res.status(200).json({
            success: true,
            message: "Machine created successfully",
            data: newMachine
        });
    }
    catch (error) {
        // Handle errors if the machine creation fails
        res.status(404).json({
            success: false,
            message: "Machine not created",
            // error: error.message // Optionally, you can include the error message for debugging
        });
    }
});
exports.createMachine = createMachine;
// const findMachines = async (req: Request, res: Response) => {
const findMachines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        console.log('Received startDate:', startDate);
        console.log('Received endDate:', endDate);
        // Create a filter object based on the provided dates
        const filter = {};
        if (startDate) {
            filter.time = { $gte: new Date(startDate) };
        }
        if (endDate) {
            filter.time = Object.assign(Object.assign({}, filter.time), { $lt: new Date(endDate) });
        }
        console.log('Filter:', filter);
        // Query the database using the filter
        const filteredData = yield machine_model_1.default.find(filter);
        console.log('Filtered Data:', filteredData);
        res.status(200).json(filteredData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.findMachines = findMachines;
