import { ClickAwayListener, Input, InputProps, ListItem } from "@mui/material";
import { KeyboardEventHandler } from "react";
import { IconButton, Row } from "..";
import { Check, Close } from "@mui/icons-material";

export interface EditableListItemProps {
  inputProps?: InputProps;
  onCancel: () => void;
  onSave: () => void;
  onChange: (text: string) => void;
}

export const EditableListItem: React.FC<EditableListItemProps> = ({
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
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            onChange(e.currentTarget.value);
          }}
          autoFocus
          {...inputProps}
        />
        <Row>
          <IconButton
            testId="save participant"
            Icon={<Check />}
            size="small"
            onClick={onSave}
          />
          <IconButton
            testId="cancel participant"
            Icon={<Close />}
            size="small"
            onClick={onCancel}
          />
        </Row>
      </ListItem>
    </ClickAwayListener>
  );
};
