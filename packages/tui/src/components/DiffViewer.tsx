import React from 'react';
import { Box, Text } from 'ink';
import { DesignTokens } from './tokens';
import { DiffHunk } from '../../core/src/diff';

export const DiffViewer = ({ hunks }: { hunks: DiffHunk[] }) => (
  <Box flexDirection="column" backgroundColor={DesignTokens.bg.surface} padding={1}>
    {hunks.map((hunk, i) => (
      <Box key={i}>
        <Text color={DesignTokens.text.muted} width={4}> {hunk.lineNo} </Text>
        {hunk.type === 'add' && (
          <Box backgroundColor={DesignTokens.diff.addBg}>
            <Text color={DesignTokens.diff.addText}>+ {hunk.content}</Text>
          </Box>
        )}
        {hunk.type === 'del' && (
          <Box backgroundColor={DesignTokens.diff.delBg}>
            <Text color={DesignTokens.diff.delText}>- {hunk.content}</Text>
          </Box>
        )}
        {hunk.type === 'same' && (
          <Text color={DesignTokens.text.primary}>  {hunk.content}</Text>
        )}
      </Box>
    ))}
  </Box>
);
