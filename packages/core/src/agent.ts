import {
  generateText,
  type ToolResult,
  type CoreMessage,
  type ToolCall
} from 'ai';
import { z } from 'zod';

export interface ToolDefinition {
  description: string;
  parameters: z.ZodTypeAny;
  execute: (args: any) => Promise<ToolResult | string>;
}

export class DevoraAgent {
  private messages: CoreMessage[] = [];
  private toolRegistry: Map<string, ToolDefinition> = new Map();

  constructor(private model: any, private systemPrompt: string) {
    this.messages.push({
      role: 'system',
      content: systemPrompt
    });
  }

  registerTool(name: string, definition: ToolDefinition) {
    this.toolRegistry.set(name, definition);
  }

  async chat(prompt: string): Promise<string> {
    this.messages.push({ role: 'user', content: prompt });

    let loopCount = 0;
    const MAX_LOOP = 10;

    while (loopCount < MAX_LOOP) {
      const result = await generateText({
        model: this.model,
        system: this.systemPrompt,
        messages: this.messages,
        tools: this.getToolsConfig(),
      });

      this.messages.push(result.responseMessage);

      if (result.toolCalls && result.toolCalls.length > 0) {
        for (const toolCall of result.toolCalls) {
          const tool = this.toolRegistry.get(toolCall.toolName);
          if (!tool) {
            throw new Error(`Tool ${toolCall.toolName} not found`);
          }

          const toolResult = await tool.execute(toolCall.args);
          this.messages.push({
            role: 'tool',
            content: typeof toolResult === 'string' ? toolResult : JSON.stringify(toolResult),
            toolCallId: toolCall.toolCallId,
          });
        }
        loopCount++;
        continue;
      }

      return result.text;
    }

    return "Maximum tool call depth reached.";
  }

  private getToolsConfig() {
    const tools: any = {};
    for (const [name, def] of this.toolRegistry.entries()) {
      tools[name] = {
        description: def.description,
        parameters: def.parameters,
      };
    }
    return tools;
  }
}
