import { useState, ChangeEventHandler, KeyboardEventHandler } from "react";
import { IconButton, Row } from "..";
import { Close, Edit } from "@mui/icons-material";
import { CircularProgress, Input, InputAdornment } from "@mui/material";
import React from "react";

export interface EditableProps {
  children: JSX.Element | string;
  defaultText: string;
  isLoading: boolean;
  onSubmit: (value: string) => void;
}

export const Editable: React.FC<EditableProps> = ({
  children,
  defaultText,
  isLoading,
  onSubmit,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState(defaultText);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (value !== defaultText) {
      onSubmit(value);
      setEdit(false);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setEdit(false);
    setValue(defaultText);
  };

  return (
    <Row>
      {edit ? (
        <Input
          size="small"
          placeholder={defaultText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={value}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                testId="close icon button"
                size="small"
                Icon={<Close />}
                onClick={handleClose}
              />
            </InputAdornment>
          }
        />
      ) : (
        <>
          {children}
          {isLoading ? (
            <Row ml={1}>
              <CircularProgress size={20} />
            </Row>
          ) : (
            <IconButton
              testId="edit icon button"
              size="small"
              Icon={<Edit fontSize="small" />}
              onClick={() => setEdit(true)}
            />
          )}
        </>
      )}
    </Row>
  );
};
