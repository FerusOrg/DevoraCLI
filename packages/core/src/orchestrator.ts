import { DevoraAgent } from './agent';
import { z } from 'zod';

export interface AgentTask {
  id: string;
  description: string;
  assignedModel: any;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
}

export class DevoraOrchestrator {
  private agents: Map<string, { agent: DevoraAgent, task: AgentTask }> = new Map();

  constructor(private mainAgent: DevoraAgent, private modelRouter: any) {}

  async spawnAgent(taskDescription: string, modelOverride?: any) {
    const taskId = `agent_${Math.random().toString(36).substring(7)}`;
    const model = modelOverride || this.modelRouter.getBestModelForTask('complex');

    const agent = new DevoraAgent(model, `You are a specialized sub-agent of Devora. Your task is: ${taskDescription}`);

    const task: AgentTask = {
      id: taskId,
      description: taskDescription,
      assignedModel: model,
      status: 'pending'
    };

    this.agents.set(taskId, { agent, task });
    return taskId;
  }

  async executeParallel(tasks: { description: string, model?: any }[]) {
    const taskIds = await Promise.all(tasks.map(t => this.spawnAgent(t.description, t.model)));

    const promises = taskIds.map(async (id) => {
      const entry = this.agents.get(id)!;
      entry.task.status = 'running';
      try {
        const result = await entry.agent.chat(entry.task.description);
        entry.task.status = 'completed';
        entry.task.result = result;
        return { id, result };
      } catch (e: any) {
        entry.task.status = 'failed';
        return { id, error: e.message };
      }
    });

    return Promise.all(promises);
  }

  getAgentsStatus() {
    return Array.from(this.agents.values()).map(e => e.task);
  }
}
