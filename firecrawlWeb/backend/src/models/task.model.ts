import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';

interface TaskAttributes {
  id: number;
  user_id: number;
  name: string;
  type: 'scrape' | 'batch-scrape' | 'crawl' | 'map';
  url: string;
  config?: object;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress?: number;
  firecrawl_job_id?: string;
  start_time?: Date | null;
  end_time?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

type TaskCreationAttributes = Optional<
  TaskAttributes,
  'id' | 'config' | 'status' | 'progress' | 'firecrawl_job_id' | 'start_time' | 'end_time' | 'created_at' | 'updated_at'
>;

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public type!: 'scrape' | 'batch-scrape' | 'crawl' | 'map';
  public url!: string;
  public config?: object;
  public status!: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  public progress?: number;
  public firecrawl_job_id?: string;
  public start_time?: Date | null;
  public end_time?: Date | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('scrape', 'batch-scrape', 'crawl', 'map'),
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    config: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'running', 'completed', 'failed', 'cancelled'),
      defaultValue: 'pending',
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    firecrawl_job_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Task.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Task;
