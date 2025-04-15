"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_model_1 = __importDefault(require("./user.model"));
class Task extends sequelize_1.Model {
}
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: user_model_1.default,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('scrape', 'batch-scrape', 'crawl', 'map'),
        allowNull: false,
    },
    url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    config: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'running', 'completed', 'failed', 'cancelled'),
        defaultValue: 'pending',
    },
    progress: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    firecrawl_job_id: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    start_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    end_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
Task.belongsTo(user_model_1.default, { foreignKey: 'user_id', as: 'user' });
exports.default = Task;
