"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const task_routes_1 = __importDefault(require("./task.routes"));
const result_routes_1 = __importDefault(require("./result.routes"));
const system_routes_1 = __importDefault(require("./system.routes"));
const router = (0, express_1.Router)();
router.use('/users', user_routes_1.default);
router.use('/tasks', task_routes_1.default);
router.use('/results', result_routes_1.default);
router.use('/system', system_routes_1.default);
exports.default = router;
