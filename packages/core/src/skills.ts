import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

export interface Skill {
  name: string;
  description: string;
  triggers: string[];
  appliesTo: string[];
  content: string;
  version: string;
}

const SkillSchema = z.object({
  name: z.string(),
  description: z.string(),
  triggers: z.array(z.string()),
  appliesTo: z.array(z.string()),
  version: z.string(),
});

export class SkillManager {
  private activeSkills: Map<string, Skill> = new Map();

  constructor(private projectRoot: string) {}

  async loadSkills() {
    const locations = [
      path.join(process.env.HOME || '', '.devora/skills'),
      path.join(process.env.HOME || '', '.devora/skills/public'),
      path.join(this.projectRoot, '.devora/skills'),
      path.join(this.projectRoot, '.devora/skills/team'),
    ];

    for (const loc of locations) {
      try {
        const files = await fs.readdir(loc);
        for (const file of files) {
          if (file.endsWith('.md')) {
            await this.loadSkillFile(path.join(loc, file));
          }
        }
      } catch (e) {
        // Location might not exist, skip
      }
    }
  }

  private async loadSkillFile(filePath: string) {
    const content = await fs.readFile(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---([\\s\\S]*?)---/);

    if (!frontmatterMatch) return;

    try {
      const yaml = frontmatterMatch[1];
      const parsedFrontmatter = this.parseYaml(yaml);
      const validated = SkillSchema.parse(parsedFrontmatter);

      const skillContent = content.replace(frontmatterMatch[0], '').trim();

      this.activeSkills.set(validated.name, {
        ...validated,
        content: skillContent,
      });
    } catch (e) {
      console.error(`Failed to load skill at ${filePath}: ${e}`);
    }
  }

  private parseYaml(yaml: string) {
    const obj: any = {};
    yaml.split('\\n').forEach(line => {
      const [key, ...val] = line.split(':');
      if (key && val) {
        const trimmedKey = key.trim();
        let trimmedVal = val.join(':').trim();
        if (trimmedVal.startsWith('[') && trimmedVal.endsWith(']')) {
          trimmedVal = trimmedVal.slice(1, -1).split(',').map(s => s.trim().replace(/^"/, '').replace(/"$/, ''));
        }
        obj[trimmedKey] = trimmedVal;
      }
    });
    return obj;
  }

  async getRelevantSkills(context: { files: string[], prompt: string }): Promise<string> {
    let combinedInstructions = '';

    for (const [name, skill] of this.activeSkills.entries()) {
      const isTriggered = skill.triggers.some(t => context.prompt.toLowerCase().includes(t.toLowerCase()));
      const isApplied = skill.appliesTo.some(pattern =>
        context.files.some(f => f.includes(pattern))
      );

      if (isTriggered || isApplied) {
        combinedInstructions += `\\n### Skill: ${name}\\n${skill.content}\\n`;
      }
    }

    return combinedInstructions;
  }
}
