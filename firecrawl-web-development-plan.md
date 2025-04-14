# FireCrawl Web界面开发详细步骤清单

## 阶段一：环境准备与项目初始化

### 1. 项目目录结构创建
```bash
# 在根目录创建项目文件夹
mkdir -p firecrawlWeb
cd firecrawlWeb

# 创建基本目录结构
mkdir -p frontend backend docker config data logs
```

### 2. 初始化前端项目
```bash
# 进入前端目录
cd frontend

# 使用Next.js创建React应用
npx create-next-app@latest . --typescript --eslint --tailwind --app

# 安装必要的依赖
npm install axios react-query socket.io-client react-hook-form zod @hookform/resolvers react-markdown recharts @headlessui/react @heroicons/react
```

### 3. 初始化后端项目
```bash
# 进入后端目录
cd ../backend

# 初始化Node.js项目
npm init -y

# 安装必要的依赖
npm install express cors helmet morgan winston dotenv mongoose mysql2 sequelize jsonwebtoken bcrypt socket.io axios redis bull express-rate-limit cookie-parser
npm install -D typescript ts-node @types/node @types/express nodemon
```

### 4. 配置数据库连接
```bash
# 在backend目录下创建.env文件
touch .env

# 编辑.env文件，添加数据库连接信息
echo "DB_HOST=localhost
DB_PORT=3306
DB_USER=word_Y4Y4
DB_PASSWORD=你的密码
DB_NAME=word_7...
REDIS_URL=redis://localhost:6379
JWT_SECRET=你的密钥
PORT=3001" > .env
```

### 5. 创建Docker配置
```bash
# 在docker目录下创建Docker配置文件
cd ../docker

# 创建docker-compose.yml
touch docker-compose.yml

# 创建FireCrawl的Dockerfile
touch firecrawl.Dockerfile
```

## 阶段二：数据库设计与初始化

### 1. 设计数据库表结构
```sql
-- 用户表
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 爬虫任务表
CREATE TABLE tasks (
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
);

-- 爬虫结果表
CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    content_type ENUM('markdown', 'html', 'json', 'screenshot') NOT NULL,
    content LONGTEXT,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- 任务日志表
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    level ENUM('info', 'warning', 'error') DEFAULT 'info',
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);
```

### 2. 创建数据库初始化脚本
```bash
# 在backend目录下创建数据库初始化脚本
cd ../backend
mkdir -p scripts
touch scripts/init-db.js
```

## 阶段三：后端API开发

### 1. 设置TypeScript配置
```bash
# 在backend目录下创建tsconfig.json
npx tsc --init

# 编辑tsconfig.json，配置TypeScript选项
```

### 2. 创建后端目录结构
```bash
# 在backend目录下创建必要的子目录
mkdir -p src/controllers src/models src/routes src/middlewares src/services src/utils src/config
```

### 3. 实现数据库模型
```bash
# 创建用户模型
touch src/models/user.model.ts

# 创建任务模型
touch src/models/task.model.ts

# 创建结果模型
touch src/models/result.model.ts

# 创建日志模型
touch src/models/log.model.ts
```

### 4. 实现控制器
```bash
# 创建用户控制器
touch src/controllers/user.controller.ts

# 创建任务控制器
touch src/controllers/task.controller.ts

# 创建结果控制器
touch src/controllers/result.controller.ts

# 创建系统控制器
touch src/controllers/system.controller.ts
```

### 5. 实现路由
```bash
# 创建用户路由
touch src/routes/user.routes.ts

# 创建任务路由
touch src/routes/task.routes.ts

# 创建结果路由
touch src/routes/result.routes.ts

# 创建系统路由
touch src/routes/system.routes.ts

# 创建主路由文件
touch src/routes/index.ts
```

### 6. 实现中间件
```bash
# 创建认证中间件
touch src/middlewares/auth.middleware.ts

# 创建错误处理中间件
touch src/middlewares/error.middleware.ts

# 创建日志中间件
touch src/middlewares/logger.middleware.ts
```

### 7. 实现服务
```bash
# 创建FireCrawl服务
touch src/services/firecrawl.service.ts

# 创建任务队列服务
touch src/services/queue.service.ts

# 创建WebSocket服务
touch src/services/socket.service.ts
```

### 8. 创建主应用文件
```bash
# 创建主应用文件
touch src/app.ts

# 创建服务器启动文件
touch src/server.ts
```

## 阶段四：前端开发

### 1. 配置前端项目
```bash
# 在frontend目录下配置环境变量
cd ../frontend
touch .env.local

# 编辑.env.local文件
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=http://localhost:3001" > .env.local
```

### 2. 创建组件
```bash
# 创建布局组件
mkdir -p app/components/layout
touch app/components/layout/Sidebar.tsx
touch app/components/layout/Header.tsx
touch app/components/layout/Footer.tsx
touch app/components/layout/Layout.tsx

# 创建任务相关组件
mkdir -p app/components/tasks
touch app/components/tasks/TaskForm.tsx
touch app/components/tasks/TaskList.tsx
touch app/components/tasks/TaskCard.tsx
touch app/components/tasks/TaskDetails.tsx
touch app/components/tasks/TaskProgress.tsx

# 创建结果相关组件
mkdir -p app/components/results
touch app/components/results/ResultViewer.tsx
touch app/components/results/ResultExport.tsx
touch app/components/results/ResultFilter.tsx

# 创建用户相关组件
mkdir -p app/components/users
touch app/components/users/LoginForm.tsx
touch app/components/users/RegisterForm.tsx
touch app/components/users/UserProfile.tsx

# 创建UI组件
mkdir -p app/components/ui
touch app/components/ui/Button.tsx
touch app/components/ui/Card.tsx
touch app/components/ui/Modal.tsx
touch app/components/ui/Alert.tsx
touch app/components/ui/Spinner.tsx
```

### 3. 创建页面
```bash
# 创建主页
touch app/page.tsx

# 创建登录页面
mkdir -p app/login
touch app/login/page.tsx

# 创建注册页面
mkdir -p app/register
touch app/register/page.tsx

# 创建仪表盘页面
mkdir -p app/dashboard
touch app/dashboard/page.tsx

# 创建任务页面
mkdir -p app/tasks
touch app/tasks/page.tsx

# 创建任务详情页面
mkdir -p app/tasks/[id]
touch app/tasks/[id]/page.tsx

# 创建创建任务页面
mkdir -p app/tasks/create
touch app/tasks/create/page.tsx

# 创建结果页面
mkdir -p app/results
touch app/results/page.tsx

# 创建设置页面
mkdir -p app/settings
touch app/settings/page.tsx
```

### 4. 创建API服务
```bash
# 创建API服务
mkdir -p app/services
touch app/services/api.ts
touch app/services/auth.ts
touch app/services/task.ts
touch app/services/result.ts
touch app/services/socket.ts
```

### 5. 创建状态管理
```bash
# 创建状态管理
mkdir -p app/store
touch app/store/auth.ts
touch app/store/task.ts
touch app/store/result.ts
```

## 阶段五：FireCrawl集成

### 1. 配置FireCrawl Docker容器
```bash
# 编辑docker/docker-compose.yml文件，添加FireCrawl服务配置
```

### 2. 创建FireCrawl环境变量文件
```bash
# 在docker目录下创建FireCrawl环境变量文件
cd ../docker
touch firecrawl.env

# 编辑firecrawl.env文件
echo "NUM_WORKERS_PER_QUEUE=8
PORT=3002
HOST=0.0.0.0
REDIS_URL=redis://redis:6379
REDIS_RATE_LIMIT_URL=redis://redis:6379
PLAYWRIGHT_MICROSERVICE_URL=http://playwright-service:3000/html
USE_DB_AUTHENTICATION=false
LOGGING_LEVEL=INFO" > firecrawl.env
```

### 3. 实现FireCrawl API集成
```bash
# 在backend/src/services目录下完善FireCrawl服务
```

## 阶段六：OpenResty配置

### 1. 创建OpenResty配置文件
```bash
# 在config目录下创建OpenResty配置文件
cd ../config
mkdir -p nginx
touch nginx/firecrawl.conf
```

### 2. 配置反向代理
```nginx
# 编辑firecrawl.conf文件
server {
    listen 80;
    server_name firecrawl.yourdomain.com;
    
    # 重定向到HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name firecrawl.yourdomain.com;
    
    # SSL配置
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # 前端代理
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 后端API代理
    location /api {
        proxy_pass http://localhost:3001/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # WebSocket代理
    location /socket.io {
        proxy_pass http://localhost:3001/socket.io;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
    
    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        proxy_pass http://localhost:3000;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

## 阶段七：Docker配置完善

### 1. 完善docker-compose.yml
```yaml
# 编辑docker/docker-compose.yml文件
version: '3.8'

services:
  # 前端服务
  frontend:
    build:
      context: ../frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - firecrawl-network
    depends_on:
      - backend

  # 后端服务
  backend:
    build:
      context: ../backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    env_file:
      - ../backend/.env
    volumes:
      - ../logs:/app/logs
    restart: unless-stopped
    networks:
      - firecrawl-network
    depends_on:
      - redis

  # Redis服务（如果不使用1Panel的Redis）
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    restart: unless-stopped
    networks:
      - firecrawl-network

  # FireCrawl服务
  firecrawl:
    build:
      context: .
      dockerfile: firecrawl.Dockerfile
    ports:
      - "3002:3002"
    env_file:
      - firecrawl.env
    restart: unless-stopped
    networks:
      - firecrawl-network
    depends_on:
      - redis
      - playwright-service

  # Playwright服务
  playwright-service:
    image: mendableai/playwright-service:latest
    restart: unless-stopped
    networks:
      - firecrawl-network

networks:
  firecrawl-network:
    driver: bridge

volumes:
  redis-data:
```

### 2. 创建前端Dockerfile
```bash
# 在frontend目录下创建Dockerfile
cd ../frontend
touch Dockerfile

# 编辑Dockerfile
echo "FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD [\"npm\", \"start\"]" > Dockerfile
```

### 3. 创建后端Dockerfile
```bash
# 在backend目录下创建Dockerfile
cd ../backend
touch Dockerfile

# 编辑Dockerfile
echo "FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3001

CMD [\"npm\", \"start\"]" > Dockerfile
```

### 4. 完善FireCrawl Dockerfile
```bash
# 编辑docker/firecrawl.Dockerfile
cd ../docker

# 编辑firecrawl.Dockerfile
echo "FROM mendableai/firecrawl:latest

EXPOSE 3002

CMD [\"npm\", \"start\"]" > firecrawl.Dockerfile
```

## 阶段八：1Panel配置

### 1. 在1Panel中创建应用
- 登录1Panel管理面板
- 进入应用管理
- 创建新应用
- 上传docker-compose.yml文件
- 配置应用参数

### 2. 配置MySQL数据库
- 在1Panel中进入MySQL管理
- 为FireCrawl Web创建新的数据库用户（如果需要）
- 导入数据库初始化脚本

### 3. 配置OpenResty
- 在1Panel中进入网站管理
- 创建新网站
- 上传SSL证书
- 配置反向代理规则

## 阶段九：开发实施

### 1. 后端开发
```bash
# 进入后端目录
cd ../backend

# 实现数据库模型
# 实现控制器
# 实现路由
# 实现中间件
# 实现服务

# 启动开发服务器
npm run dev
```

### 2. 前端开发
```bash
# 进入前端目录
cd ../frontend

# 实现组件
# 实现页面
# 实现服务
# 实现状态管理

# 启动开发服务器
npm run dev
```

### 3. FireCrawl集成
```bash
# 测试FireCrawl API
# 实现FireCrawl服务集成
```

## 阶段十：测试与部署

### 1. 单元测试
```bash
# 后端单元测试
cd ../backend
npm test

# 前端单元测试
cd ../frontend
npm test
```

### 2. 集成测试
```bash
# 测试前后端集成
# 测试FireCrawl集成
```

### 3. 构建生产版本
```bash
# 构建前端
cd ../frontend
npm run build

# 构建后端
cd ../backend
npm run build
```

### 4. 部署到1Panel
```bash
# 使用1Panel部署应用
# 配置域名和SSL
# 启动服务
```

### 5. 部署后测试
```bash
# 测试网站访问
# 测试用户注册/登录
# 测试爬虫功能
# 测试结果查看
```

## 阶段十一：文档编写

### 1. 用户手册
```bash
# 创建用户手册
mkdir -p docs/user
touch docs/user/README.md
```

### 2. 开发文档
```bash
# 创建开发文档
mkdir -p docs/dev
touch docs/dev/README.md
```

### 3. API文档
```bash
# 创建API文档
mkdir -p docs/api
touch docs/api/README.md
```

### 4. 部署文档
```bash
# 创建部署文档
mkdir -p docs/deploy
touch docs/deploy/README.md
```

## 阶段十二：维护与更新

### 1. 监控设置
```bash
# 设置系统监控
# 设置错误告警
```

### 2. 备份策略
```bash
# 设置数据库备份
# 设置代码备份
```

### 3. 更新计划
```bash
# 制定定期更新计划
# 制定功能扩展计划
```

## 附录：FireCrawl主要功能参考

### 1. 抓取功能 (Scrape)
- 单URL抓取
- 支持多种输出格式 (Markdown/HTML/JSON)
- 结构化数据提取
- 页面交互动作
- 截图功能

### 2. 爬取功能 (Crawl)
- 递归爬取网站
- 深度和数量限制
- 实时状态监控
- WebSocket实时更新
- Webhook通知

### 3. 地图功能 (Map)
- 快速获取网站URL结构
- 生成网站地图

### 4. 提取功能 (Extract)
- 结构化数据提取
- 支持自定义提取模式
- 支持无模式提取

### 5. 高级功能
- 地理位置和语言设置
- 批量URL处理
- 变更跟踪
- 代理和反爬虫处理
