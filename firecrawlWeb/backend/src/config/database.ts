import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '../.env' });

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'firecrawl',
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  logging: false,
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
