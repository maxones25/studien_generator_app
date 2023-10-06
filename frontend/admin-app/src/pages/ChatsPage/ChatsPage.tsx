import { useGetChats } from "@modules/chat/hooks";
import {
  DataList,
  DataListItem,
  IconButton,
  Page,
  Text,
} from "@modules/core/components";
import { useNavigationHelper, useSearch } from "@modules/core/hooks";
import { useChatId } from "@modules/navigation/hooks";
import { Search, SearchOff } from "@mui/icons-material";
import {
  Badge,
  BadgeProps,
  ClickAwayListener,
  Divider,
  Input,
  ListItemButton,
  ListItemText,
  Toolbar,
  styled,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -20,
    top: 15,
    border: `1px solid ${theme.palette.background.paper}`,
  },
}));

export interface ChatsPageProps {}

const ChatsPage: React.FC<ChatsPageProps> = () => {
  const { t } = useTranslation();
  const search = useSearch();
  const navigate = useNavigationHelper();
  const getChats = useGetChats();
  const chatId = useChatId(false);

  return (
    <Page testId="chats page" width={250} boxShadow={6} zIndex={900}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Text variant="h6">{t("chats")}</Text>
        <IconButton
          testId="open search"
          Icon={search.isActive ? <SearchOff /> : <Search />}
          color={search.isActive ? "primary" : "default"}
          onClick={search.toggle}
        />
      </Toolbar>
      <Divider />
      {search.isActive && (
        <ClickAwayListener onClickAway={search.stop}>
          <Input
            sx={{ ml: 2, mr: 2, mt: 1, mb: 1 }}
            placeholder={t("search...")}
            onChange={(e) => search.set(e.currentTarget.value)}
            autoFocus
            size="small"
          />
        </ClickAwayListener>
      )}
      <DataList
        client={getChats}
        disablePadding
        errorText={t("fetch error data", { data: t("chats") })}
        noDataText={t("no data found", { data: t("chats") })}
        searchFields={["participantNumber"]}
        searchValue={search.value}
        renderItem={(chat, { isLast }) => (
          <DataListItem key={chat.id} divider={!isLast} item={chat}>
            <ListItemButton
              onClick={navigate.handle(`${chat.id}`)}
              selected={chatId === chat.id}
            >
              <StyledBadge
                badgeContent={
                  <span data-testid="unread messages">{chat.unread}</span>
                }
                color="error"
                max={999}
              >
                <ListItemText
                  primary={chat.participantNumber}
                  secondary={chat.newestMessage.content ?? "-"}
                />
              </StyledBadge>
            </ListItemButton>
          </DataListItem>
        )}
      />
    </Page>
  );
};

export default ChatsPage;
