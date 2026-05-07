import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { Pane, StatusLine } from './components';
import { DiffViewer } from './components/DiffViewer';
import { DesignTokens } from './tokens';
import { generateUnifiedDiff } from '../../core/src/diff';

export const DevoraLayout = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'devora', content: 'Hello! I am Devora. How can I help you today?' }
  ]);
  const [diffData, setDiffData] = useState<any>(null);

  useInput((input, key) => {
    if (key.ctrl && key.d) {
      // Trigger diff view mock
      setDiffData(generateUnifiedDiff('const x = 1;\\nconsole.log(x);', 'const x = 10;\\nconsole.log(x);'));
    }
  });

  return (
    <Box flexDirection="column" backgroundColor={DesignTokens.bg.base} padding={1}>
      <Box flexDirection="row" height={24}>
        <Pane title="Chat" width="60%" height="100%">
          <Box flexDirection="column" height="90%" overflow="auto">
            {messages.map((m, i) => (
              <Box key={i} marginBottom={1}>
                <Text color={m.role === 'user' ? DesignTokens.text.link : DesignTokens.accent.primary}>
                  {m.role === 'user' ? '● You' : '◆ Devora'}:
                </Text>
                <Text color={DesignTokens.text.primary}> {m.content}</Text>
              </Box>
            ))}
          </Box>
        </Pane>
        <Pane title="File Tree" width="20%" height="100%">
          <Text color={DesignTokens.text.secondary}>📁 src/...</Text>
        </Pane>
        <Pane title="Diff" width="20%" height="100%">
          {diffData ? <DiffViewer hunks={diffData} /> : <Text color={DesignTokens.text.muted}>No changes to show</Text>}
        </Pane>
      </Box>

      <Box borderStyle="single" borderColor={DesignTokens.border.default} paddingX={1} marginY={1}>
        <Text color={DesignTokens.text.primary}>&gt; {input}_</Text>
      </Box>

      <StatusLine
        model="claude-sonnet-4-5"
        cost="0.003"
        tokens="1204"
        branch="main"
      />
    </Box>
  );
};
