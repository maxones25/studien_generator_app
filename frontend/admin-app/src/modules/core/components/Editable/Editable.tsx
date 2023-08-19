import {
  useState,
  KeyboardEventHandler,
  useRef,
  HTMLInputTypeAttribute,
} from "react";
import { IconButton, Row } from "..";
import { Close, Edit } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  ClickAwayListener,
  Input,
  InputAdornment,
} from "@mui/material";

export interface EditableProps {
  children: JSX.Element | string;
  type?: HTMLInputTypeAttribute;
  defaultText: string;
  isLoading?: boolean;
  disabled?: boolean;
  showClose?: boolean;
  onSubmit: (value: string) => void;
}

export const Editable: React.FC<EditableProps> = ({
  children,
  defaultText,
  type = "text",
  showClose = true,
  isLoading = false,
  disabled = false,
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
            type={type}
            inputRef={inputRef}
            placeholder={defaultText}
            defaultValue={defaultText}
            onKeyDown={handleKeyDown}
            // sx={{ m: 1 }}
            endAdornment={
              showClose && (
                <InputAdornment position="end">
                  <IconButton
                    testId="close icon button"
                    size="small"
                    Icon={<Close />}
                    onClick={handleClose}
                  />
                </InputAdornment>
              )
            }
          />
        </ClickAwayListener>
      ) : (
        <Button
          data-testid="edit icon button"
          onClick={() => setEdit(true)}
          disabled={disabled}
          sx={{ textTransform: "none" }}
        >
          {children}
          {isLoading ? (
            <Row ml={1}>
              <CircularProgress size={20} />
            </Row>
          ) : (
            <Edit sx={{ ml: 1 }} fontSize="small" />
          )}
        </Button>
      )}
    </Row>
  );
};
