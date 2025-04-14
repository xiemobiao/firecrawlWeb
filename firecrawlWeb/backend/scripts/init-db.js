require('dotenv').config();
const mysql = require('mysql2/promise');

async function initDatabase() {
  try {
    // 创建数据库连接
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Connected to MySQL database');

    // 创建用户表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created or already exists');

    // 创建爬虫任务表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        type ENUM('scrape', 'batch-scrape', 'crawl', 'map') NOT NULL,
        url TEXT NOT NULL,
        config JSON,
        status ENUM('pending', 'running', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
        progress FLOAT DEFAULT 0,
        firecrawl_job_id VARCHAR(100),
        start_time TIMESTAMP NULL,
        end_time TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Tasks table created or already exists');

    // 创建爬虫结果表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task_id INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        content_type ENUM('markdown', 'html', 'json', 'screenshot') NOT NULL,
        content LONGTEXT,
        metadata JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
      )
    `);
    console.log('Results table created or already exists');

    // 创建任务日志表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task_id INT NOT NULL,
        level ENUM('info', 'warning', 'error') DEFAULT 'info',
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
      )
    `);
    console.log('Logs table created or already exists');

    // 关闭连接
    await connection.end();
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// 执行初始化
initDatabase();
