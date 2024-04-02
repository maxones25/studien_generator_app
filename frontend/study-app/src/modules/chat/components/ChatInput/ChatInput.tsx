import { useAccessTokenContext } from '@modules/auth/contexts';
import { usePostChatMessage } from '@modules/chat/hooks';
import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

export interface ChatInputProps {}

export const ChatInput: React.FC<ChatInputProps> = () => {
  const sendMessage = usePostChatMessage();
  const { participantId, chatId } = useAccessTokenContext();
  const [inputValue, setInputValue] = useState<string>("");
  const { t } = useTranslation();

  const handleSend = async () => {
    if (inputValue.trim()) {
      await sendMessage.mutateAsync({
        id: uuid(),
        chatId: chatId ?? '',
        participantId,
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
        alignItems: 'flex-end',
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        style={{
          borderRadius: '0px',
          height: '56px', // Stellt sicher, dass die Höhe des Buttons der des TextField entspricht
        }}
      >
        {t('send')}
      </Button>
    </div>
  );
};
