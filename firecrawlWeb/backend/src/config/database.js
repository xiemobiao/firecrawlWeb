"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '../.env' });
const { DB_HOST = 'localhost', DB_PORT = '3306', DB_USER = 'root', DB_PASSWORD = '', DB_NAME = 'firecrawl', } = process.env;
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'mysql',
    logging: false,
    define: {
        freezeTableName: true,
    },
});
exports.default = sequelize;
