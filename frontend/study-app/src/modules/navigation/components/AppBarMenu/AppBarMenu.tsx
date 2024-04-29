import { useNavigationHelper } from '@modules/core/hooks';
import { Settings, Logout, Info } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface AppBarMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleLogout: () => void;
  open: boolean;
}

export const AppBarMenu : React.FC<AppBarMenuProps>= ({
  anchorEl,
  handleClose,
  handleLogout,
  open,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigationHelper();

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            right: 0,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      <MenuItem 
        data-testid={'go-settings-app-bar'} 
        onClick={navigate.handle('../settings')}
      >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        {t('settings')}
      </MenuItem>
      <MenuItem 
        data-testid={'go-app-details-app-bar'} 
        onClick={navigate.handle('../details')}
      >
        <ListItemIcon>
          <Info fontSize="small" />
        </ListItemIcon>
        {t('app details')}
      </MenuItem>
      <MenuItem 
        data-testid={'log-out-app-bar'} 
        onClick={handleLogout}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        {t('logout')}
      </MenuItem>
    </Menu>
  );
};