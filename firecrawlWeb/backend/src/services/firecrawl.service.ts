/**
 * FireCrawl服务模块示例实现
 * 负责管理爬虫任务的启动、停止及状态管理
 */

class FireCrawlService {
  private runningJobs = new Map<string, any>();

  // 启动爬虫任务，传入任务ID及配置
  public startJob(jobId: string, config: object): boolean {
    if (this.runningJobs.has(jobId)) {
      return false; // 任务已在运行
    }
    // 模拟启动任务
    this.runningJobs.set(jobId, config);
    console.log(`FireCrawl job started: ${jobId}`);
    return true;
  }

  // 停止爬虫任务
  public stopJob(jobId: string): boolean {
    if (!this.runningJobs.has(jobId)) {
      return false; // 任务不存在或未运行
    }
    this.runningJobs.delete(jobId);
    console.log(`FireCrawl job stopped: ${jobId}`);
    return true;
  }

  // 查询任务状态
  public getJobStatus(jobId: string): string {
    return this.runningJobs.has(jobId) ? 'running' : 'not running';
  }
}

export default new FireCrawlService();