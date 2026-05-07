import sqlite3 from 'better-sqlite3';
import { z } from 'zod';

export type MemoryScope = 'user' | 'project' | 'team';

export interface MemoryEntry {
  id: number;
  scope: MemoryScope;
  content: string;
  tags: string[];
  createdAt: number;
}

export class MemoryStore {
  private db: sqlite3.Database;

  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath);
    this.init();
  }

  private init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS memories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scope TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT,
        createdAt INTEGER NOT NULL
      )
    `);
  }

  async add(scope: MemoryScope, content: string, tags: string[] = []) {
    const stmt = this.db.prepare('INSERT INTO memories (scope, content, tags, createdAt) VALUES (?, ?, ?, ?)');
    stmt.run(scope, content, JSON.stringify(tags), Date.now());
  }

  async get(scope?: MemoryScope, query?: string) {
    let stmt = this.db.prepare('SELECT * FROM memories');

    if (scope && query) {
      stmt = this.db.prepare('SELECT * FROM memories WHERE scope = ? AND content LIKE ?');
      return stmt.all(scope, `%${query}%`);
    } else if (scope) {
      stmt = this.db.prepare('SELECT * FROM memories WHERE scope = ?');
      return stmt.all(scope);
    }

    return stmt.all();
  }

  async delete(id: number) {
    this.db.prepare('DELETE FROM memories WHERE id = ?').run(id);
  }

  async clear(scope: MemoryScope) {
    this.db.prepare('DELETE FROM memories WHERE scope = ?').run(scope);
  }
}
