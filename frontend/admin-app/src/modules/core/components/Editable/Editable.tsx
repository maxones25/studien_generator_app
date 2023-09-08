import {
  useState,
  KeyboardEventHandler,
  useRef,
  HTMLInputTypeAttribute,
} from "react";
import { IconButton, Row, RowProps } from "..";
import { Close, Edit } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  ClickAwayListener,
  Input,
  InputAdornment,
} from "@mui/material";

export interface EditableProps extends Omit<RowProps, "onSubmit"> {
  children: JSX.Element | string;
  type?: HTMLInputTypeAttribute;
  defaultText: string;
  isLoading?: boolean;
  disabled?: boolean;
  showClose?: boolean;
  testId?: string;
  inputTestId?: string;
  onSubmit: (value: string) => void;
}

export const Editable: React.FC<EditableProps> = ({
  testId,
  inputTestId,
  children,
  defaultText,
  type = "text",
  showClose = true,
  isLoading = false,
  disabled = false,
  onSubmit,
  ...props
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
    <Row {...props}>
      {edit ? (
        <ClickAwayListener onClickAway={handleSubmit}>
          <Input
            size="small"
            type={type}
            inputRef={inputRef}
            placeholder={defaultText}
            defaultValue={defaultText}
            onKeyDown={handleKeyDown}
            inputProps={{
              "data-testid": inputTestId,
            }}
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
          data-testid={testId}
          onClick={() => setEdit(true)}
          disabled={disabled}
          sx={{
            textTransform: "none",
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
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
