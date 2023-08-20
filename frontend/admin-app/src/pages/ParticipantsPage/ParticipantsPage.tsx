import {
  ChipSelect,
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
import {
  useCreateParticipant,
  useGetParticipants,
} from "@modules/participants/hooks";
import { ParticipantFormData } from "@modules/participants/types";
import {
  Add,
  Check,
  Construction,
  Loop,
  Search,
  SearchOff,
} from "@mui/icons-material";
import {
  ClickAwayListener,
  Divider,
  Input,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { isoDate } from "@modules/date/utils";

export interface ParticipantsPageProps {}

const filterOptions = [
  {
    label: "Aktuell",
    value: "current",
  },
  {
    label: "ohne Gruppe",
    value: "no group",
  },
];

const ParticipantsPage: React.FC<ParticipantsPageProps> = () => {
  const { t } = useTranslation();
  const getParticipants = useGetParticipants();
  const navigate = useNavigationHelper();
  const participantData = useFormData<ParticipantFormData>();
  const createParticipant = useCreateParticipant();
  const search = useSearch();
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const handleCreateParticipant = () => {
    if (participantData.data) {
      createParticipant.mutate(participantData.data);
      participantData.reset();
    }
  };

  const currentDate = isoDate();

  return (
    <Page testId="participants page" width={250} boxShadow={6} zIndex={900}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Text variant="h6">{t("participants")}</Text>
        <Row>
          <IconButton
            testId="create participant button"
            Icon={<Add />}
            color={participantData.hasData ? "primary" : "default"}
            onClick={participantData.handleSet({ number: "" })}
          />
          <IconButton
            testId="open search button"
            Icon={search.isActive ? <SearchOff /> : <Search />}
            color={search.isActive ? "primary" : "default"}
            onClick={search.toggle}
          />
        </Row>
      </Toolbar>
      <Divider />
      <ChipSelect
        options={filterOptions}
        onSelect={setFilter}
        value={filter}
        chipProps={{
          sx: {
            flex: 1,
          },
        }}
        containerProps={{
          justifyContent: "space-around",
        }}
      />
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
      {participantData.hasData && (
        <EditableListItem
          onCancel={participantData.reset}
          onChange={(number) => participantData.set({ number })}
          onSave={handleCreateParticipant}
          inputProps={{
            placeholder: t("enter value", { value: t("name") }),
          }}
        />
      )}
      <DataList
        client={getParticipants}
        errorText="error"
        noDataText="no data"
        searchFields={["number", "group.name"]}
        searchValue={search.value}
        filter={(item) => {
          if (!filter) return true;
          if (filter === "no group" && item.group === null) return true;
          if (
            filter === "current" &&
            item.startedAt &&
            !item.endedAt &&
            item.startedAt < currentDate
          )
            return true;
          return false;
        }}
        renderItem={(participant) => (
          <DataListItem key={participant.id} item={participant} disablePadding>
            <ListItemButton onClick={navigate.handle(`${participant.id}`)}>
              <ListItemIcon>
                {participant.startedAt ? participant.endedAt ? <Check/> : <Loop /> : <Construction />}
              </ListItemIcon>
              <ListItemText
                primary={participant.number}
                secondary={participant.group?.name ?? t("no group")}
              />
            </ListItemButton>
          </DataListItem>
        )}
      />
    </Page>
  );
};

export default ParticipantsPage;
