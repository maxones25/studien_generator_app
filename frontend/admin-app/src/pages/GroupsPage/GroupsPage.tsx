import {
  DataList,
  EditableListItem,
  IconButton,
  Page,
  Row,
  Text,
} from "@modules/core/components";
import {
  useFormData,
  useNavigationHelper,
  useSearch,
} from "@modules/core/hooks";
import {
  useCreateGroup,
  useGetGroups,
  useRestoreGroup,
} from "@modules/groups/hooks";
import { GroupFormData } from "@modules/groups/types";
import { useGroupId } from "@modules/navigation/hooks";
import { Add, RestoreFromTrash, Search, SearchOff } from "@mui/icons-material";
import {
  ClickAwayListener,
  Divider,
  Input,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface GroupsPageProps {}

const GroupsPage: React.FC<GroupsPageProps> = () => {
  const { t } = useTranslation();
  const groupId = useGroupId(false);
  const navigate = useNavigationHelper();
  const editGroupData = useFormData<GroupFormData>();
  const getGroups = useGetGroups({ deleted: true });
  const createGroup = useCreateGroup();
  const restoreGroup = useRestoreGroup();
  const search = useSearch();

  const handleCreateGroup = () => {
    if (editGroupData.data) {
      createGroup.mutate(editGroupData.data);
      editGroupData.reset();
    }
  };

  return (
    <Page testId="groups page" width={250} boxShadow={6} zIndex={900}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Text variant="h6">{t("groups")}</Text>
        <Row>
          <IconButton
            testId="open group input"
            Icon={<Add />}
            color={editGroupData.hasData ? "primary" : "default"}
            onClick={editGroupData.handleSet({ name: "" })}
          />
          <IconButton
            testId="open search"
            Icon={search.isActive ? <SearchOff /> : <Search />}
            color={search.isActive ? "primary" : "default"}
            onClick={search.toggle}
          />
        </Row>
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
      {editGroupData.hasData && (
        <EditableListItem
          record="group"
          onCancel={editGroupData.reset}
          onChange={(name) => editGroupData.set({ name })}
          onSave={handleCreateGroup}
          inputProps={{
            placeholder: t("enter value", { value: t("name") }),
          }}
        />
      )}
      <DataList
        client={getGroups}
        disablePadding
        errorText={t("fetch error data", { data: t("groups") })}
        noDataText={t("no data found", { data: t("groups") })}
        searchFields={["name"]}
        searchValue={search.value}
        renderItem={(group, { isLast }) => {
          const isDeleted = group.deletedAt !== null;
          return (
            <ListItem
              key={group.id}
              divider={!isLast}
              disablePadding
              secondaryAction={
                isDeleted && (
                  <IconButton
                    testId={`restore group ${group.id}`}
                    Icon={<RestoreFromTrash />}
                    onClick={() => restoreGroup.mutate(group)}
                    tooltipProps={{
                      title: t("restore record", { record: t("group") }),
                    }}
                  />
                )
              }
            >
              <ListItemButton
                onClick={navigate.handle(`${group.id}`)}
                selected={groupId === group.id}
                disabled={isDeleted}
              >
                <ListItemText>{group.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        }}
      />
    </Page>
  );
};

export default GroupsPage;
