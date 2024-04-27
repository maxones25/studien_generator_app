import { useMenuAnchor } from "@modules/core/hooks";
import { MoreVert } from "@mui/icons-material";
import { IconButton, ListItem, ListItemProps, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface DataListItemProps<ItemData> extends ListItemProps {
  item: ItemData;
  children: JSX.Element | JSX.Element[] | false;
  divider?: boolean;
  disablePadding?: boolean;
  accordion?: JSX.Element;
  onUpdate?: (item: ItemData) => void;
  onDelete?: (item: ItemData) => void;
}

export function DataListItem<ItemData>({
  item,
  children,
  accordion,
  divider = false,
  disablePadding = true,
  onDelete,
  onUpdate,
  ...props
}: DataListItemProps<ItemData>) {
  const menuAnchor = useMenuAnchor();
  const { t } = useTranslation();

  const handleClick = (callback: (item: ItemData) => void) => () => {
    callback(item);
    menuAnchor.close();
  };

  return (
    <ListItem
    {...props}
      divider={divider}
      disablePadding={disablePadding}
      secondaryAction={
        accordion
          ? accordion
          : (onUpdate || onDelete) && (
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
                    <MenuItem onClick={handleClick(onUpdate)}>{t('edit')}</MenuItem>
                  )}
                  {onDelete && (
                    <MenuItem onClick={handleClick(onDelete)}>{t('delete')}</MenuItem>
                  )}
                </Menu>
              </>
            )
      }
    >
      {children}
    </ListItem>
  );
}
