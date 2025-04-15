"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const task_model_1 = __importDefault(require("./task.model"));
class Result extends sequelize_1.Model {
}
Result.init({
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
    url: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    content_type: {
        type: sequelize_1.DataTypes.ENUM('markdown', 'html', 'json', 'screenshot'),
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: true,
    },
    metadata: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: 'results',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: false,
});
Result.belongsTo(task_model_1.default, { foreignKey: 'task_id', as: 'task' });
exports.default = Result;
