"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const machine_controller_1 = require("../controllers/machine.controller");
router.post("/create", machine_controller_1.createMachine);
router.get("/", machine_controller_1.findMachines);
exports.default = router;
/**
 * GET POST PUT DELETE
 * GET localhost:3000/api/machine
 * POST localhost:3000/api/machine
 * DELETE localhost:3000/api/machine/4
 * PUT localhost:3000/api/machine/4
 *
 * */
