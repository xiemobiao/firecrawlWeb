import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Task from './task.model';

interface ResultAttributes {
  id: number;
  task_id: number;
  url: string;
  content_type: 'markdown' | 'html' | 'json' | 'screenshot';
  content?: string;
  metadata?: object;
  created_at?: Date;
}

type ResultCreationAttributes = Optional<ResultAttributes, 'id' | 'content' | 'metadata' | 'created_at'>;

class Result extends Model<ResultAttributes, ResultCreationAttributes> implements ResultAttributes {
  public id!: number;
  public task_id!: number;
  public url!: string;
  public content_type!: 'markdown' | 'html' | 'json' | 'screenshot';
  public content?: string;
  public metadata?: object;
  public readonly created_at!: Date;
}

Result.init(
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
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content_type: {
      type: DataTypes.ENUM('markdown', 'html', 'json', 'screenshot'),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'results',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

Result.belongsTo(Task, { foreignKey: 'task_id', as: 'task' });

export default Result;
