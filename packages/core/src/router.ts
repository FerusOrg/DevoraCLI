export class ModelRouter {
  private routingConfig: Record<string, string> = {
    default: 'anthropic/claude-sonnet-4-5',
    complex: 'anthropic/claude-opus-4',
    fast: 'groq/llama-3.1-8b-instant',
    vision: 'openai/gpt-4o',
    codegen: 'deepseek/deepseek-coder-v2',
    search: 'perplexity/sonar-pro',
    local: 'ollama/qwen2.5-coder:14b'
  };

  getBestModelForTask(taskType: keyof typeof this.routingConfig) {
    return this.routingConfig[taskType] || this.routingConfig.default;
  }

  updateRoute(taskType: string, model: string) {
    this.routingConfig[taskType] = model;
  }
}
