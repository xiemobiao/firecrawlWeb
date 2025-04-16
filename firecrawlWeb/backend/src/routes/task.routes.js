"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
        return;
    };
}
router.get('/', asyncHandler(task_controller_1.getUserTasks));
router.post('/create', asyncHandler(task_controller_1.createTask));
router.get('/:id', asyncHandler(task_controller_1.getTaskById));
exports.default = router;
