import axios from 'axios'; // 导入 Axios 库用于 HTTP 请求

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'; // API 基础 URL，从环境变量或默认值

export const api = axios.create({
  baseURL: API_BASE_URL, // 设置基础 URL
  headers: {
    'Content-Type': 'application/json', // 设置内容类型为 JSON
  },
});

// 添加拦截器或自定义方法如果需要