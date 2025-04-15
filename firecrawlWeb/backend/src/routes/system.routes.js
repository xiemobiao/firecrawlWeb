"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const system_controller_1 = require("../controllers/system.controller");
const router = (0, express_1.Router)();
router.get('/health', system_controller_1.healthCheck);
router.get('/info', system_controller_1.getSystemInfo);
exports.default = router;
