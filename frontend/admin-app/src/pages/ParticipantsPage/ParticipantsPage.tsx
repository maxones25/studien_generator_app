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
import {
  useCreateParticipant,
  useGetParticipants,
} from "@modules/participants/hooks";
import { ParticipantFormData } from "@modules/participants/types";
import { Add, Search, SearchOff } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export interface ParticipantsPageProps {}

const ParticipantsPage: React.FC<ParticipantsPageProps> = () => {
  const { t } = useTranslation();
  const getParticipants = useGetParticipants();
  const navigate = useNavigationHelper();
  const participantData = useFormData<ParticipantFormData>();
  const createParticipant = useCreateParticipant();
  const search = useSearch();

  const handleCreateParticipant = () => {
    if (participantData.data) {
      createParticipant.mutate(participantData.data);
      participantData.reset();
    }
  };

  return (
    <Page testId="participants page" width={250} boxShadow={6} zIndex={900}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Text variant="h6">{t("participants")}</Text>
        <Row>
          <IconButton
            testId="create participant button"
            Icon={<Add />}
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
      {participantData.hasData && (
        <EditableListItem
          onCancel={participantData.reset}
          onChange={(number) => participantData.set({ number })}
          onSave={handleCreateParticipant}
        />
      )}
      {search.isActive && (
        <TextField
          variant="standard"
          sx={{ ml: 2, mr: 2 }}
          placeholder={t("search...")}
          onChange={(e) => search.set(e.currentTarget.value)}
          size="small"
        />
      )}
      <DataList
        client={getParticipants}
        errorText="error"
        noDataText="no data"
        searchFields={["number"]}
        searchValue={search.value}
        renderItem={(participant) => (
          <DataListItem key={participant.id} item={participant}>
            <ListItemButton onClick={navigate.handle(`${participant.id}`)}>
              <ListItemText>{participant.number}</ListItemText>
            </ListItemButton>
          </DataListItem>
        )}
      />
    </Page>
  );
};

export default ParticipantsPage;
