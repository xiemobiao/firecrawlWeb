import Queue from 'bull';
import Task from '../models/task.model';
import dotenv from 'dotenv';
import redis from 'redis'; // For Redis connection, if needed

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const queue = new Queue('taskQueue', redisUrl);

export class QueueService {
  async addTaskToQueue(task: Task): Promise<void> {
    await queue.add(task);
    console.log(`Task added to queue: ${task.id}`);
  }

  async processQueue(): Promise<void> {
    queue.process(async (job) => {
      const task = job.data as Task;
      // Simulate task processing
      console.log(`Processing task: ${task.id}`);
      // In a real scenario, call FireCrawl or other services here
      await job.progress(50);
      // Complete the job
      return { status: 'completed' };
    });
  }

  // Add more methods as needed, e.g., for monitoring or removing jobs
}