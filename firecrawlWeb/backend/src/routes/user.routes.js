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
Object.defineProperty(exports, "__esModule", { value: true });
// 删除重复导入，保留一次
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { try {
    yield (0, user_controller_1.register)(req, res);
}
catch (err) {
    next(err);
} }));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { try {
    yield (0, user_controller_1.login)(req, res);
}
catch (err) {
    next(err);
} }));
router.get('/profile', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { try {
    yield (0, user_controller_1.getUserProfile)(req, res);
}
catch (err) {
    next(err);
} }));
exports.default = router;
