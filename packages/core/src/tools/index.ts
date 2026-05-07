import { z } from 'zod';
import { ToolDefinition } from '../agent';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'fast-glob';

const execPromise = promisify(exec);

export const CoreTools: Record<string, ToolDefinition> = {
  run_command: {
    description: 'Execute a shell command in the terminal',
    parameters: z.object({
      command: z.string().describe('The command to run'),
    }),
    execute: async ({ command }) => {
      try {
        const { stdout, stderr } = await execPromise(command);
        return stdout || stderr || 'Command executed successfully.';
      } catch (e: any) {
        return `Error: ${e.message}`;
      }
    },
  },
  read_file: {
    description: 'Read the contents of a file',
    parameters: z.object({
      path: z.string().describe('Absolute path to the file'),
    }),
    execute: async ({ path }) => {
      try {
        return await fs.readFile(path, 'utf-8');
      } catch (e: any) {
        return `Error reading file: ${e.message}`;
      }
    },
  },
  write_file: {
    description: 'Write or overwrite a file',
    parameters: z.object({
      path: z.string().describe('Absolute path to the file'),
      content: z.string().describe('Content to write'),
    }),
    execute: async ({ path, content }) => {
      try {
        await fs.writeFile(path, content);
        return `File written to ${path}`;
      } catch (e: any) {
        return `Error writing file: ${e.message}`;
      }
    },
  },
  grep: {
    description: 'Search for a pattern in files using grep',
    parameters: z.object({
      pattern: z.string().describe('The regex pattern to search for'),
      path: z.string().describe('The directory or file to search in'),
    }),
    execute: async ({ pattern, path }) => {
      try {
        const { stdout } = await execPromise(`grep -r "${pattern}" ${path}`);
        return stdout;
      } catch (e: any) {
        return e.stdout || `Error: ${e.message}`;
      }
    },
  },
  find_files: {
    description: 'Find files matching a glob pattern',
    parameters: z.object({
      pattern: z.string().describe('Glob pattern (e.g. "**/*.ts")'),
      root: z.string().optional().describe('Root directory to start search'),
    }),
    execute: async ({ pattern, root }) => {
      try {
        const files = await glob(pattern, { cwd: root || process.cwd(), absolute: true });
        return files.join('\\n');
      } catch (e: any) {
        return `Error: ${e.message}`;
      }
    },
  },
  git_status: {
    description: 'Get the current git status of the working tree',
    parameters: z.object({}),
    execute: async () => {
      try {
        const { stdout } = await execPromise('git status');
        return stdout;
      } catch (e: any) {
        return `Error: ${e.message}`;
      }
    },
  },
  git_commit: {
    description: 'Commit staged changes with a message',
    parameters: z.object({
      message: z.string().describe('Commit message'),
    }),
    execute: async ({ message }) => {
      try {
        const { stdout } = await execPromise(`git commit -m "${message}"`);
        return stdout;
      } catch (e: any) {
        return `Error: ${e.message}`;
      }
    },
  },
};
