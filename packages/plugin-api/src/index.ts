import { z } from 'zod';

export interface DevoraPlugin {
  name: string;
  version: string;
  description: string;
  tools?: Array<{
    name: string;
    description: string;
    parameters: z.ZodTypeAny;
    execute: (args: any) => Promise<string | any>;
  }>;
  commands?: Array<{
    name: string;
    description: string;
    handler: (args: string[], ctx: any) => Promise<string>;
  }>;
}

export function definePlugin(config: DevoraPlugin): DevoraPlugin {
  return config;
}
