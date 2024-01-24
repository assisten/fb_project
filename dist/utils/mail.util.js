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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// import User from "../models/user.model";
const gmailAppPassword = "dryz urlf xjiu aerm";
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: "abdullahamjad7000@gmail.com",
        pass: gmailAppPassword,
    },
});
const sendEmail = (email, subject, body) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: "abdullahamjad7000@gmail.com",
        to: email,
        subject,
        text: body,
    };
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield transporter.sendMail(mailOptions);
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
});
exports.sendEmail = sendEmail;
