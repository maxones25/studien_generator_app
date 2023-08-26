import { Message } from '@modules/chat/types';
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
    <ListItem style={{ justifyContent: message.directorId ? "flex-end" : "flex-start", padding: '.5rem' }}>
      <Paper style={{
        padding: '10px',
        maxWidth: '70%',
        wordBreak: 'break-word',
        backgroundColor: message.directorId ? palette.primary.light : palette.grey[200],
        boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
        borderRadius: '15px',
      }}>
        <Typography variant="body1">{message.content}</Typography>
        {message.directorName && <Typography variant="caption" display="block">{message.directorName}</Typography>}
        {message.participantNumber && <Typography variant="caption" display="block">{message.participantNumber}</Typography>}
        <Typography variant="caption" display="block" align="right">
          {new Date(message.sentAt).toLocaleDateString("de")}
        </Typography>
      </Paper>
    </ListItem>
  );
};