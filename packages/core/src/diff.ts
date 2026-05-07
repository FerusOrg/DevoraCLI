import { DesignTokens } from '../../tui/src/tokens';

export interface DiffHunk {
  lineNo: number;
  type: 'add' | 'del' | 'same';
  content: string;
}

export function generateUnifiedDiff(oldContent: string, newContent: string): DiffHunk[] {
  const oldLines = oldContent.split('\\n');
  const newLines = newContent.split('\\n');
  const diff: DiffHunk[] = [];

  // Simple linear diff for demonstration (In production, use a library like 'diff')
  const max = Math.max(oldLines.length, newLines.length);
  for (let i = 0; i < max; i++) {
    if (oldLines[i] === newLines[i]) {
      diff.push({ lineNo: i + 1, type: 'same', content: oldLines[i] || '' });
    } else {
      if (i < oldLines.length) {
        diff.push({ lineNo: i + 1, type: 'del', content: oldLines[i] });
      }
      if (i < newLines.length) {
        diff.push({ lineNo: i + 1, type: 'add', content: newLines[i] });
      }
    }
  }
  return diff;
}
