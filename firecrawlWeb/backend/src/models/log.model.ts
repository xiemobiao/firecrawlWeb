import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Task from './task.model';

interface LogAttributes {
  id: number;
  task_id: number;
  level: 'info' | 'warning' | 'error';
  message: string;
  created_at?: Date;
}

type LogCreationAttributes = Optional<LogAttributes, 'id' | 'level' | 'created_at'>;

class Log extends Model<LogAttributes, LogCreationAttributes> implements LogAttributes {
  public id!: number;
  public task_id!: number;
  public level!: 'info' | 'warning' | 'error';
  public message!: string;
  public readonly created_at!: Date;
}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Task,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    level: {
      type: DataTypes.ENUM('info', 'warning', 'error'),
      defaultValue: 'info',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'logs',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

Log.belongsTo(Task, { foreignKey: 'task_id', as: 'task' });

export default Log;
