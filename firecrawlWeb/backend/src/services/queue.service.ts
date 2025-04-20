/**
 * 任务队列服务示例实现
 * 使用简单的内存队列模拟任务的排队和处理
 */

type TaskQueueItem = {
  jobId: string;
  config: object;
};

class QueueService {
  private queue: TaskQueueItem[] = [];
  private isProcessing = false;

  // 向队列添加任务
  public enqueue(task: TaskQueueItem): void {
    this.queue.push(task);
    this.processQueue();
  }

  // 处理队列任务
  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        console.log(`Processing task: ${task.jobId}`);
        // 模拟异步任务处理
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    this.isProcessing = false;
  }

  // 返回当前队列长度
  public getQueueLength(): number {
    return this.queue.length;
  }
}

export default new QueueService();