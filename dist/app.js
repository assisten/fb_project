"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const fbroutes_1 = __importDefault(require("./fbroutes/fbroutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", fbroutes_1.default);
mongoose_1.default.connect('mongodb://localhost:27017/emty').then(() => {
    console.log("MongoDB connected successfully");
}).catch((e) => {
    console.error(e);
});
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
