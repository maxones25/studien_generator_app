import { ClickAwayListener, Input, InputProps, ListItem } from "@mui/material";
import { KeyboardEventHandler } from "react";
import { IconButton, Row } from "..";
import { Check, Close } from "@mui/icons-material";

export interface EditableListItemProps {
  record: string;
  inputProps?: InputProps;
  onCancel: () => void;
  onSave: () => void;
  onChange: (text: string) => void;
}

export const EditableListItem: React.FC<EditableListItemProps> = ({
  record,
  inputProps,
  onCancel,
  onChange,
  onSave,
}) => {
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      onSave();
    }
  };

  return (
    <ClickAwayListener onClickAway={onCancel}>
      <ListItem sx={{ flexDirection: "column" }}>
        <Input
          data-testid={`change ${record} text`}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            onChange(e.currentTarget.value);
          }}
          autoFocus
          {...inputProps}
        />
        <Row>
          <IconButton
            testId={`submit ${record}`}
            Icon={<Check />}
            size="small"
            onClick={onSave}
          />
          <IconButton
            testId={`cancel ${record}`}
            Icon={<Close />}
            size="small"
            onClick={onCancel}
          />
        </Row>
      </ListItem>
    </ClickAwayListener>
  );
};
