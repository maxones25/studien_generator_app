import { AppBar as MAppBar, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ArrowBack, MailOutline, LogoutOutlined } from '@mui/icons-material';
import { useNavigationHelper } from '@modules/core/hooks';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@modules/core/components';
import { LogOutDialog } from '..';

export interface AppBarProps {}

export const AppBar : React.FC<AppBarProps>= () => {
  const navigate = useNavigationHelper();
  const path = useLocation().pathname;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const changePage = () => {
    if (path === "/tasks")
      return navigate.handle('../records');
    return navigate.handle('../tasks');
  }

  const handleClick = () => setOpen(!open);

  return (
      <MAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, visibility: path === "/tasks" ? "hidden" : "inherit"}}
            onClick={changePage()}
            testId={'go-back-app-bar'}
            Icon={<ArrowBack /> }
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t(`${path}`)}
          </Typography>
          { path !== "/chat" && 
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={navigate.handle('../chat')}
            testId='go-mail-app-bar'
            Icon={<MailOutline /> }
          /> }
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            testId='log-out-app-bar'
            Icon={<LogoutOutlined />}
          />
        </Toolbar>
        <LogOutDialog 
          open={open}
          onClose={handleClick}
        />
      </MAppBar>
  );
};