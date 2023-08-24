import { Badge, AppBar as MAppBar, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ArrowBack, MailOutline, Menu, CalendarMonthOutlined } from '@mui/icons-material';
import { useNavigationHelper } from '@modules/core/hooks';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconButton, ZiIcon } from '@modules/core/components';
import { AppBarMenu, LogOutDialog } from '..';
import { getNewMessagesCount } from '@modules/chat/utils';

export interface AppBarProps {}

export const AppBar : React.FC<AppBarProps>= () => {
  const navigate = useNavigationHelper();
  const path = useLocation().pathname;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const newMessagesCount = getNewMessagesCount();

  const changePage = () => {
    if (path === "/tasks")
      return navigate.handle('../records');
    return navigate.handle('../tasks');
  }

  const handleClick = () => setOpen(!open);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  return (
      <MAppBar 
        position="static"
        ref={anchorRef}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={path === "/tasks" ? undefined : changePage()}
            testId={'go-back-app-bar'}
            Icon={path === "/tasks" ? <ZiIcon /> : <ArrowBack /> }
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, pl: 1}}>
            {t(`${path}`)}
          </Typography>
          { path !== "/calendar" && 
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 1 }}
            onClick={navigate.handle('../calendar')}
            testId='go-calendar-app-bar'
            Icon={<CalendarMonthOutlined /> }
          /> }
          { path !== "/chat" && 
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 1 }}
            onClick={navigate.handle('../chat')}
            testId='go-chat-app-bar'
            Icon={
              <Badge color='error' badgeContent={newMessagesCount}>
                <MailOutline /> 
              </Badge>
            }
          /> }
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 1 }}
            onClick={handleToggle}
            testId='menu-app-bar'
            Icon={<Menu />}
          />
        </Toolbar>
        <AppBarMenu 
          anchorEl={anchorRef.current}
          handleClose={handleToggle}
          handleLogout={handleClick}
          open={openMenu}
        />
        <LogOutDialog 
          open={open}
          onClose={handleClick}
        />
      </MAppBar>
  );
};