import { usePostChatMessage } from '@modules/chat/hooks';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ChatInputProps {}

export const ChatInput : React.FC<ChatInputProps> = ({
  
}) => {
  const sendMessage = usePostChatMessage();
  const [inputValue, setInputValue] = useState<string>("");
  const { t } = useTranslation();

  const handleSend = async () => {
    if (inputValue.trim()) {
      sendMessage.mutateAsync({
        directorId: '',
        sentAt: new Date(),
        content: inputValue
      });
      setInputValue("");
    }
  };

  return (
    <div 
      style={{ 
        display: 'flex',
        width: '100%', 
        paddingTop: '10px', 
      }}
    >
      <TextField
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
          }
      }}
        label={t('type your message')}
        multiline 
        maxRows={4}
      />
    </div>
  );
};