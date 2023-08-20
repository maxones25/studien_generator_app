import { Message } from '@modules/chat/types';
import { formatDateTime } from '@modules/chat/utils';
import { ListItem, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';

export interface ChatMessageProps {
  message: Message,
}

export const ChatMessage : React.FC<ChatMessageProps>= ({
  message,
}) => {
  const { palette } = useTheme();

  return (
    <ListItem style={{ justifyContent: message.participantId ? "flex-end" : "flex-start" }}>
      <Paper style={{
        padding: '10px',
        maxWidth: '70%',
        wordBreak: 'break-word',
        backgroundColor: message.participantId ? palette.primary.light : palette.grey[200],
        boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
        marginBottom: '10px',
        borderRadius: '15px'
      }}>
        <Typography variant="body1">{message.content}</Typography>
        {message.directorName && <Typography variant="caption" display="block">{message.directorName}</Typography>}
        <Typography variant="caption" display="block" align="right">
          {formatDateTime(message.sentAt)}
        </Typography>
      </Paper>
    </ListItem>
  );
};