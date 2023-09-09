import { Message } from "@modules/chat/types";
import { ListItem, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

export interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { palette } = useTheme();

  const isDirectorMessage = message.director !== null;

  const displayName = isDirectorMessage
    ? message.director?.firstName + " " + message.director?.lastName
    : message.participant?.number;

  return (
    <ListItem
      style={{
        justifyContent: isDirectorMessage ? "flex-end" : "flex-start",
        padding: ".5rem",
      }}
    >
      <Paper
        style={{
          padding: "10px",
          maxWidth: "70%",
          wordBreak: "break-word",
          backgroundColor: isDirectorMessage
            ? palette.secondary.light
            : palette.grey[200],
          boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
          borderRadius: "15px",
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="caption" display="block">
          {displayName}
        </Typography>
        <Typography variant="caption" display="block" align="right">
          {new Date(message.sentAt).toLocaleDateString("de")}
        </Typography>
      </Paper>
    </ListItem>
  );
};
