import fs from 'fs/promises';
import path from 'path';
import { MemoryStore } from './memory';

export class MemoryManager {
  private userStore: MemoryStore;
  private projectStore: MemoryStore;

  constructor(projectRoot: string) {
    this.userStore = new MemoryStore(path.join(process.env.HOME || '', '.devora/memory.db'));
    this.projectStore = new MemoryStore(path.join(projectRoot, '.devora/memory.db'));
  }

  async saveMemory(scope: 'user' | 'project' | 'team', content: string) {
    if (scope === 'user') {
      await this.userStore.add('user', content);
    } else if (scope === 'project') {
      await this.projectStore.add('project', content);
    } else if (scope === 'team') {
      // Team memory is JSON based according to spec
      await this.saveTeamMemory(content);
    }
  }

  private async saveTeamMemory(content: string) {
    const teamMemPath = path.join(process.cwd(), '.devora/team-memory.json');
    const data = JSON.parse(await fs.readFile(teamMemPath, 'utf8').catch(() => '[]'));
    data.push({ content, timestamp: Date.now() });
    await fs.writeFile(teamMemPath, JSON.stringify(data, null, 2));
  }

  async retrieveContext(query: string) {
    const userMem = await this.userStore.get('user', query);
    const projMem = await this.projectStore.get('project', query);
    return { userMem, projMem };
  }
}
