"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const task_model_1 = __importDefault(require("./task.model"));
class Log extends sequelize_1.Model {
}
Log.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    task_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: task_model_1.default,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    level: {
        type: sequelize_1.DataTypes.ENUM('info', 'warning', 'error'),
        defaultValue: 'info',
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: 'logs',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: false,
});
Log.belongsTo(task_model_1.default, { foreignKey: 'task_id', as: 'task' });
exports.default = Log;
