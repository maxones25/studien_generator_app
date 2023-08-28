import {
  DataList,
  DataListItem,
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
import { useCreateEntity, useGetEntities } from "@modules/entities/hooks";
import { EntityFormData } from "@modules/entities/types";
import { useEntityId } from "@modules/navigation/hooks";
import { Add, Search, SearchOff } from "@mui/icons-material";
import {
  ClickAwayListener,
  Input,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
export interface EntitiesPageProps {}

const EntitiesPage: React.FC<EntitiesPageProps> = () => {
  const { t } = useTranslation();
  const search = useSearch();
  const entityId = useEntityId();
  const navigate = useNavigationHelper();
  const getEntities = useGetEntities();
  const createEntity = useCreateEntity();
  const entityData = useFormData<EntityFormData>();

  const handleCreate = () => {
    if (entityData.data) {
      createEntity.mutate(entityData.data);
      entityData.reset();
    }
  };

  return (
    <Page testId="entities page" width={250} boxShadow={6} zIndex={800}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", pl: 2 }}>
        <Text variant="h6">{t("entities")}</Text>
        <Row>
          <IconButton
            testId="create participant button"
            Icon={<Add />}
            color={entityData.hasData ? "primary" : "default"}
            onClick={entityData.handleSet({ name: "" })}
          />
          <IconButton
            testId="open search button"
            Icon={search.isActive ? <SearchOff /> : <Search />}
            color={search.isActive ? "primary" : "default"}
            onClick={search.toggle}
          />
        </Row>
      </Toolbar>
      {search.isActive && (
        <ClickAwayListener onClickAway={search.stop}>
          <Input
            sx={{ ml: 2, mr: 2 }}
            placeholder={t("search...")}
            onChange={(e) => search.set(e.currentTarget.value)}
            autoFocus
            size="small"
          />
        </ClickAwayListener>
      )}
      {entityData.hasData && (
        <EditableListItem
          onCancel={entityData.reset}
          onChange={(name) => entityData.set({ name })}
          onSave={handleCreate}
          inputProps={{
            placeholder: t("enter value", { value: t("number") }),
          }}
        />
      )}
      <DataList
        client={getEntities}
        errorText={t("fetch error data", { data: t("entities") })}
        noDataText={t("no data found", { data: t("entities") })}
        searchFields={["name"]}
        searchValue={search.value}
        renderItem={(entity, { isLast }) => (
          <DataListItem key={entity.id} item={entity} divider={!isLast}>
            <ListItemButton
              onClick={navigate.handle(`${entity.id}`)}
              selected={entityId === entity.id}
            >
              <ListItemText>{entity.name}</ListItemText>
            </ListItemButton>
          </DataListItem>
        )}
      />
    </Page>
  );
};

export default EntitiesPage;
