import React from 'react';
import { Box, Text } from 'ink';
import { DesignTokens } from './tokens';

export const Pane = ({ children, title, width = '100%', height = 'auto', border = true }: any) => (
  <Box
    borderStyle="single"
    borderColor={DesignTokens.border.default}
    width={width}
    height={height}
    paddingX={1}
  >
    {title && (
      <Box marginBottom={1}>
        <Text color={DesignTokens.accent.primary} bold>{title}</Text>
      </Box>
    )}
    {children}
  </Box>
);

export const StatusLine = ({ model, cost, tokens, branch }: any) => (
  <Box
    borderStyle="single"
    borderColor={DesignTokens.border.default}
    backgroundColor={DesignTokens.bg.surface}
    paddingX={1}
  >
    <Text color={DesignTokens.text.secondary}>
      {model} · ${cost} · {tokens} tok · {branch}
    </Text>
  </Box>
);
