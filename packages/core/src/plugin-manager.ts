import { PluginManager } from './plugin-manager';
import { DevoraPlugin } from '@devora/plugin-api';

export class PluginManager {
  private plugins: Map<string, DevoraPlugin> = new Map();

  async loadPlugin(plugin: DevoraPlugin) {
    this.plugins.set(plugin.name, plugin);
  }

  getToolsForPlugin(name: string) {
    return this.plugins.get(name)?.tools || [];
  }

  getCommandsForPlugin(name: string) {
    return this.plugins.get(name)?.commands || [];
  }
}
