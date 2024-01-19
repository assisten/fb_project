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
exports.userlog = void 0;
const fbmodeschema_1 = __importDefault(require("../fbmodels/fbmodeschema"));
// import  Jwt  from "jsonwebtoken";
// import bcrypt from "bcrypt";
const userlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const existemail = yield fbmodeschema_1.default.findOne({ Email });
        if (existemail) {
            res.status(500).json({
                error: "User already exists with this email"
            });
        }
        const savedlogins = new fbmodeschema_1.default({
            Email,
            Password
        });
        yield savedlogins.save();
        res.status(200).json({
            message: "User Logged In Successfully",
            savedlogins
        });
    }
    catch (e) {
        res.status(500).json({
            "message": "cannot login",
            error: e
        });
    }
});
exports.userlog = userlog;
