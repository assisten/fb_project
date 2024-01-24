"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const machine_routes_1 = __importDefault(require("./routes/machine.routes"));
// middleware
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/Machine", machine_routes_1.default);
mongoose_1.default
    .connect("mongodb://localhost:27017/fb-collection")
    .then(() => {
    console.log("MongoDB connected successfully");
})
    .catch((e) => {
    console.error(e);
});
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
