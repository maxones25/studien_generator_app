import { useState, KeyboardEventHandler, useRef } from "react";
import { IconButton, Row } from "..";
import { Close, Edit } from "@mui/icons-material";
import {
  CircularProgress,
  ClickAwayListener,
  Input,
  InputAdornment,
} from "@mui/material";

export interface EditableProps {
  children: JSX.Element | string;
  defaultText: string;
  isLoading?: boolean;
  onSubmit: (value: string) => void;
}

export const Editable: React.FC<EditableProps> = ({
  children,
  defaultText,
  isLoading = false,
  onSubmit,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>();

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const value = inputRef.current?.value;
    console.log(value, inputRef);
    if (value && value !== defaultText) {
      onSubmit(value);
      setEdit(false);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setEdit(false);
    if (inputRef.current) {
      inputRef.current.value = defaultText;
    }
  };

  return (
    <Row>
      {edit ? (
        <ClickAwayListener onClickAway={handleSubmit}>
          <Input
            size="small"
            placeholder={defaultText}
            onKeyDown={handleKeyDown}
            defaultValue={defaultText}
            inputRef={inputRef}
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
        </ClickAwayListener>
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
