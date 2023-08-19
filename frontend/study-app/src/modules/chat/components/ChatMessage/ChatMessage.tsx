import { Message } from '@modules/chat/types';
import { ListItem, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

export interface ChatMessageProps {
  message: Message,
}

export const ChatMessage : React.FC<ChatMessageProps>= ({
  message,
}) => {
  return (
    <ListItem style={{ justifyContent: message.participantId ? "flex-end" : "flex-start" }}>
      <Paper style={{
        padding: '10px',
        maxWidth: '70%',
        wordBreak: 'break-word',
        backgroundColor: message.participantId ? '#e1f5fe' : '#e8eaf6',
        boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
        marginBottom: '10px',
        borderRadius: '15px'
      }}>
        <Typography variant="body1">{message.content}</Typography>
        {message.directorName && <Typography variant="caption" display="block">{message.directorName}</Typography>}
        <Typography variant="caption" display="block" align="right">
          {dayjs(message.sendAt).format('HH:mm')}
        </Typography>
      </Paper>
    </ListItem>
  );
};