import { Badge, AppBar as MAppBar, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ArrowBack, MailOutline, Menu, CalendarMonthOutlined, NotificationsOutlined } from '@mui/icons-material';
import { useNavigationHelper } from '@modules/core/hooks';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconButton, ZiIcon } from '@modules/core/components';
import { AppBarMenu, LogOutDialog } from '..';
import { getNewMessagesCount } from '@modules/chat/utils';
import { NotificationsDropDown } from '@modules/notifications/components';
import { getNewNotificationsCount } from '@modules/notifications/utils';
import { useReadNotifications } from '@modules/notifications/hooks';

export interface AppBarProps {}

export const AppBar : React.FC<AppBarProps>= () => {
  const navigate = useNavigationHelper();
  const path = useLocation().pathname;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const newMessagesCount = getNewMessagesCount();
  const newNotificationsCount = getNewNotificationsCount();
  const readNotifications = useReadNotifications();

  const changePage = () => {
    if (path === "/tasks")
      return navigate.handle('../records');
    return navigate.handle('../tasks');
  }

  const handleClick = () => setOpen(!open);

  const handleMenuToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleNotificationsToggle = () => {
    setOpenNotifications((prevOpen) => !prevOpen);
  };

  const handleOpenNotifications = () => {
    handleNotificationsToggle();
    readNotifications.mutate({
      readAt: new Date(),
    });
  }


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
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 1 }}
            onClick={handleOpenNotifications}
            testId='go-calendar-app-bar'
            Icon={
              <Badge color='error' badgeContent={newNotificationsCount}>
                <NotificationsOutlined /> 
              </Badge>
            }
          />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            disabled={path === "/calendar"}
            aria-label="menu"
            sx={{ ml: 1 }}
            onClick={navigate.handle('../calendar')}
            testId='go-calendar-app-bar'
            Icon={<CalendarMonthOutlined /> }
          />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            disabled={path === "/chat"}
            sx={{ ml: 1 }}
            onClick={navigate.handle('../chat')}
            testId='go-chat-app-bar'
            Icon={
              <Badge color='error' badgeContent={newMessagesCount}>
                <MailOutline /> 
              </Badge>
            }
          /> 
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 1 }}
            onClick={handleMenuToggle}
            testId='menu-app-bar'
            Icon={<Menu />}
          />
        </Toolbar>
        <AppBarMenu 
          anchorEl={anchorRef.current}
          handleClose={handleMenuToggle}
          handleLogout={handleClick}
          open={openMenu}
        />
        <NotificationsDropDown
          anchorEl={anchorRef.current}
          handleClose={handleNotificationsToggle}
          open={openNotifications}
        />
        <LogOutDialog 
          open={open}
          onClose={handleClick}
        />
      </MAppBar>
  );
};