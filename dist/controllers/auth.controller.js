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
exports.forgetPassword = exports.registerUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const randomstring_1 = __importDefault(require("randomstring"));
const mail_util_1 = require("../utils/mail.util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Login controller
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if the username exists
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Compare the provided password with the hashed password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, "secretkey");
        res.status(200).json({ message: "User logged in successfully", token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginUser = loginUser;
// Register controller
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Check if the email already exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "email already exists" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new user
        const newUser = new user_model_1.default({ username, email, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerUser = registerUser;
// Forget Password controller
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Check if the email exists
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const resetIdentifier = randomstring_1.default.generate();
        const hashedResetIdentifier = yield bcrypt_1.default.hash(resetIdentifier, 10);
        user.password = hashedResetIdentifier;
        yield user.save();
        (0, mail_util_1.sendEmail)(email, "Password Reset", `Your new password is: ${resetIdentifier}`);
        res.status(200).json({ message: "Password reset email sent" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.forgetPassword = forgetPassword;
