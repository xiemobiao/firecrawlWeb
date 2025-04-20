import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TaskAttributes {
  id: number;
  user_id: number;
  name: string;
  type: string; // ENUM: 'scrape', 'batch-scrape', 'crawl', 'map'
  url: string;
  config?: object; // JSON
  status: string; // ENUM: 'pending', 'running', 'completed', 'failed', 'cancelled'
  progress: number;
  firecrawl_job_id?: string;
  start_time?: Date;
  end_time?: Date;
  created_at: Date;
  updated_at: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public type!: string;
  public url!: string;
  public config?: object;
  public status!: string;
  public progress!: number;
  public firecrawl_job_id?: string;
  public start_time?: Date;
  public end_time?: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

Task.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
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
    allowNull: false,
    defaultValue: 'pending',
  },
  progress: {
    type: DataTypes.FLOAT,
    allowNull: false,
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
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'tasks',
  timestamps: true, // This handles createdAt and updatedAt automatically
});

export default Task;