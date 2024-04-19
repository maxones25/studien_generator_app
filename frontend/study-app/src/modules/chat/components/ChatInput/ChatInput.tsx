import { useAccessTokenContext } from '@modules/auth/contexts';
import { usePostChatMessage } from '@modules/chat/hooks';
import { IconButton } from '@modules/core/components';
import { Send } from '@mui/icons-material';
import { TextField, Box, useTheme, styled } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

const StyledTextField= styled(TextField)(({  }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: "white"
  }
}))

export interface ChatInputProps {}

export const ChatInput: React.FC<ChatInputProps> = () => {
  const sendMessage = usePostChatMessage();
  const { participantId, chatId } = useAccessTokenContext();
  const [inputValue, setInputValue] = useState<string>("");
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

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
    <Box
      paddingX={'10px'}
      paddingTop={'10px'}
      paddingBottom={isFocused ? '10px' : '40px'}
      style={{
        backgroundColor: palette.primary.main,
        display: 'flex',
        alignItems: 'flex-end',
        width: 'max-width',
        color: 'white'

      }}
    >
      <StyledTextField
        variant="outlined"
        fullWidth
        value={inputValue}
        placeholder={t('message')}
        onFocusCapture={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
          }
        }}
        multiline
        maxRows={4}
        sx={{
        }}
      />
      <IconButton
        testId='send-message-button'
        Icon={<Send/>}
        color="inherit"
        onClick={handleSend}
        style={{
          borderRadius: '0px',
          height: '56px', // Stellt sicher, dass die Höhe des Buttons der des TextField entspricht
        }}
      >
        {t('send')}
      </IconButton>
    </Box>
  );
};
