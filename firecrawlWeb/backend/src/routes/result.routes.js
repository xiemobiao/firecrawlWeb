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
const result_controller_1 = require("../controllers/result.controller");
const router = (0, express_1.Router)();
router.get('/task/:taskId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { try {
    yield (0, result_controller_1.getResultsByTask)(req, res);
}
catch (err) {
    next(err);
} }));
router.get('/export/:resultId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { try {
    yield (0, result_controller_1.exportResult)(req, res);
}
catch (err) {
    next(err);
} }));
exports.default = router;
