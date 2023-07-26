import { useMenuAnchor } from "@modules/core/hooks";
import { MoreVert } from "@mui/icons-material";
import { IconButton, ListItem, Menu, MenuItem } from "@mui/material";

export interface DataListItemProps<ItemData> {
  item: ItemData;
  children: JSX.Element | JSX.Element[];
  divider?: boolean;
  disablePadding?: boolean;
  onUpdate?: (item: ItemData) => void;
  onDelete?: (item: ItemData) => void;
}

export function DataListItem<ItemData>({
  item,
  children,
  divider = false,
  disablePadding = true,
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
      disablePadding={disablePadding}
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
            {onUpdate && (
              <MenuItem onClick={handleClick(onUpdate)}>Edit</MenuItem>
            )}
            {onDelete && (
              <MenuItem onClick={handleClick(onDelete)}>Delete</MenuItem>
            )}
          </Menu>
        </>
      }
    >
      {children}
    </ListItem>
  );
}
