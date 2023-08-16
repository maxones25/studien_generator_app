import { ListItem, TextField } from "@mui/material";
import { KeyboardEventHandler } from "react";
import { IconButton, Row } from "..";
import { Check, Close } from "@mui/icons-material";

export interface EditableListItemProps {
  onCancel: () => void;
  onSave: () => void;
  onChange: (text: string) => void;
}

export const EditableListItem: React.FC<EditableListItemProps> = ({
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
    <ListItem sx={{ flexDirection: "column" }}>
      <TextField
        variant="standard"
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
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
  );
};
