import {
  ChipSelect,
  DataList,
  EditableListItem,
  Heading,
  IconButton,
  Page,
  Row,
} from "@modules/core/components";
import {
  useFormData,
  useNavigationHelper,
  useSearch,
} from "@modules/core/hooks";
import {
  useCreateParticipant,
  useGetParticipants,
  useRestoreParticipant,
} from "@modules/participants/hooks";
import { ParticipantFormData } from "@modules/participants/types";
import {
  Add,
  Check,
  Construction,
  Loop,
  RestoreFromTrash,
  Search,
  SearchOff,
} from "@mui/icons-material";
import {
  ClickAwayListener,
  Divider,
  Input,
  ListItem,
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
  {
    label: "nicht gestarted",
    value: "unscheduled",
  },
];

const ParticipantsPage: React.FC<ParticipantsPageProps> = () => {
  const { t } = useTranslation();
  const getParticipants = useGetParticipants();
  const navigate = useNavigationHelper();
  const participantData = useFormData<ParticipantFormData>();
  const createParticipant = useCreateParticipant();
  const search = useSearch();
  const restoreParticipant = useRestoreParticipant();
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
        <Heading testId="participants heading">{t("participants")}</Heading>
        <Row>
          <IconButton
            testId="add participant"
            Icon={<Add />}
            color={participantData.hasData ? "primary" : "default"}
            onClick={participantData.handleSet({ number: "" })}
          />
          {search.isActive ? (
            <IconButton
              testId="close search participant"
              Icon={<SearchOff />}
              color="primary"
              onClick={search.stop}
            />
          ) : (
            <IconButton
              testId="search participant"
              Icon={<Search />}
              color="default"
              onClick={search.start}
            />
          )}
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
          justifyContent: "stretch",
        }}
      />
      {search.isActive && (
        <ClickAwayListener onClickAway={search.stop}>
          <Input
            data-testid="change search text"
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
          record="participant"
          onCancel={participantData.reset}
          onChange={(number) => participantData.set({ number })}
          onSave={handleCreateParticipant}
          inputProps={{
            placeholder: t("enter value", { value: t("number") }),
          }}
        />
      )}
      <DataList
        testId="participants list"
        client={getParticipants}
        errorText="error"
        noDataText="no data"
        searchFields={["number", "group.name"]}
        searchValue={search.value}
        filter={(item) => {
          if (!filter) return true;
          if (filter === "unscheduled" && !item.startedAt) return true;
          if (filter === "no group" && item.group === null) return true;
          if (
            filter === "current" &&
            item.startedAt &&
            !item.endedAt &&
            item.startedAt <= currentDate
          )
            return true;
          return false;
        }}
        renderItem={(participant) => (
          <ListItem
            key={participant.id}
            disablePadding
            secondaryAction={
              participant.isDeleted && (
                <IconButton
                  testId="restore participant"
                  Icon={<RestoreFromTrash />}
                  onClick={() => restoreParticipant.mutate(participant)}
                  tooltipProps={{
                    title: t("restore record", { record: t("participant") }),
                  }}
                />
              )
            }
          >
            <ListItemButton
              onClick={navigate.handle(`${participant.id}`)}
              disabled={participant.isDeleted}
            >
              <ListItemIcon>
                {participant.startedAt ? (
                  participant.endedAt ? (
                    <Check />
                  ) : (
                    <Loop />
                  )
                ) : (
                  <Construction />
                )}
              </ListItemIcon>
              <ListItemText
                primary={participant.number}
                secondary={participant.group?.name ?? t("no group")}
              />
            </ListItemButton>
          </ListItem>
        )}
      />
    </Page>
  );
};

export default ParticipantsPage;
