import { useMenuAnchor } from "@modules/core/hooks";
import { MoreVert } from "@mui/icons-material";
import { IconButton, ListItem, Menu, MenuItem } from "@mui/material";

export interface DataListItemProps<ItemData> {
  item: ItemData;
  children: JSX.Element;
  divider?: boolean;
  onUpdate: (item: ItemData) => void;
  onDelete: (item: ItemData) => void;
}

export function DataListItem<ItemData>({
  item,
  children,
  divider = false,
  onDelete,
  onUpdate,
}: DataListItemProps<ItemData>) {
  const menuAnchor = useMenuAnchor();

  const handleClick = (callback: (item: ItemData) => void) => () => {
    callback(item);
    menuAnchor.close();
  };

  return (
    <ListItem
      divider={divider}
      disablePadding
      secondaryAction={
        <>
          <IconButton onClick={menuAnchor.open}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={menuAnchor.element}
            open={menuAnchor.isOpen}
            onClose={menuAnchor.close}
          >
            <MenuItem onClick={handleClick(onUpdate)}>Edit</MenuItem>
            <MenuItem onClick={handleClick(onDelete)}>Delete</MenuItem>
          </Menu>
        </>
      }
    >
      {children}
    </ListItem>
  );
}
