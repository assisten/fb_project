"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fbcontrollers_1 = require("../fbcontrollers/fbcontrollers");
const router = (0, express_1.Router)();
router.post("/login", fbcontrollers_1.userlog);
exports.default = router;
