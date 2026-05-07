import fs from 'fs';
import path from 'path';

export interface ThemeTokens {
  "bg.base": string;
  "bg.surface": string;
  "bg.elevated": string;
  "bg.overlay": string;
  "text.primary": string;
  "text.secondary": string;
  "text.muted": string;
  "text.link": string;
  "border.default": string;
  "border.active": string;
  "border.error": string;
  "accent.primary": string;
  "accent.success": string;
  "accent.warning": string;
  "accent.error": string;
  "accent.info": string;
  "diff.add.bg": string;
  "diff.add.text": string;
  "diff.del.bg": string;
  "diff.del.text": string;
}

export class ThemeEngine {
  private currentTheme: ThemeTokens;

  constructor(themeName = 'github-dark') {
    this.currentTheme = this.loadTheme(themeName);
  }

  private loadTheme(name: string): ThemeTokens {
    try {
      const themePath = path.join(process.cwd(), 'themes', `${name}.json`);
      const data = JSON.parse(fs.readFileSync(themePath, 'utf-8'));
      return data.tokens as ThemeTokens;
    } catch (e) {
      return this.getDefaultTokens();
    }
  }

  get(token: string) {
    return this.currentTheme[token as keyof ThemeTokens];
  }

  setTheme(name: string) {
    this.currentTheme = this.loadTheme(name);
  }

  private getDefaultTokens(): ThemeTokens {
    return {
      "bg.base": "#0d1117",
      "bg.surface": "#161b22",
      "bg.elevated": "#21262d",
      "bg.overlay": "#30363d",
      "text.primary": "#e6edf3",
      "text.secondary": "#8b949e",
      "text.muted": "#484f58",
      "text.link": "#58a6ff",
      "border.default": "#30363d",
      "border.active": "#58a6ff",
      "border.error": "#f85149",
      "accent.primary": "#58a6ff",
      "accent.success": "#3fb950",
      "accent.warning": "#d29922",
      "accent.error": "#f85149",
      "accent.info": "#79c0ff",
      "diff.add.bg": "#0d4429",
      "diff.add.text": "#3fb950",
      "diff.del.bg": "#4d0f0f",
      "diff.del.text": "#f85149"
    };
  }
}

export const theme = new ThemeEngine();
