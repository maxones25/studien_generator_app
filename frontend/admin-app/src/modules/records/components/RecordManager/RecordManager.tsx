import { Button, Column, IconButton, Row } from "@modules/core/components";
import {
  Autocomplete,
  Chip,
  Divider,
  LinearProgress,
  TextField,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { EntitySelect } from "@modules/entities/components";
import { useExportRecords, useGetRecords } from "@modules/records/hooks";
import { RecordsTable, TableColumn } from "..";
import { useCounter } from "@modules/core/hooks";
import { Download, Refresh } from "@mui/icons-material";
import { ParticipantSelect } from "@modules/participants/components";
import { GroupSelect } from "@modules/groups/components";
import { FormSelect } from "@modules/forms/components";

function downloadCSV(csvText: string, fileName = "data.csv") {
  // Create a Blob with the CSV text
  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });

  // Create an invisible <a> element to trigger the download
  const link = document.createElement("a");

  if (link.download !== undefined) {
    // Feature detection
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Set the download attributes
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);

    link.click();
  } else {
    // Fallback for browsers that don't support the download attribute
    alert("Your browser does not support this download feature");
  }
}

export type RecordsManagerState = {
  formId: string | null;
  entityId: string | null;
  groupId: string | null;
  participantId: string | null;
  columns: string[];
};

export interface RecordManagerProps {
  state: RecordsManagerState;
  onStateChange: (data: Partial<RecordsManagerState>) => void;
}

export const RecordManager: React.FC<RecordManagerProps> = ({
  state,
  onStateChange,
}) => {
  const { entityId, participantId, groupId, formId, columns } = state;
  const { t } = useTranslation();
  const refreshCounter = useCounter();
  const getRecords = useGetRecords({
    entityId,
    groupId,
    formId,
    participantId,
    counter: refreshCounter.value,
  });
  const exportRecords = useExportRecords();

  const columnMap =
    getRecords.data?.reduce<Record<string, TableColumn>>(
      (map, record) => {
        Object.keys(record.fields).forEach((formFieldId) => {
          const field = record.fields[formFieldId];
          const id = `fields.${formFieldId}.value`;
          map[id] = {
            id,
            name: `${field.field.name} (${field.entity.name})`,
            type: field.field.type,
          };
        });
        return map;
      },
      {
        createdAt: {
          id: "createdAt",
          name: t("createdAt"),
          type: "DateTime",
        },
        isFailed: {
          id: "isFailed",
          name: t("isFailed"),
          type: "Boolean",
        },
        failureReason: {
          id: "failureReason",
          name: t("failureReason"),
          type: "Text",
        },
        "participant.number": {
          id: "participant.number",
          name: t("participant"),
          type: "Text",
          ref: { name: "participants", id: "participant.id" },
        },
        "participant.group.name": {
          id: "participant.group.name",
          name: t("group"),
          type: "Text",
          ref: {
            name: "groups",
            id: "participant.group.id",
          },
        },
        "task.scheduledAt": {
          id: "task.scheduledAt",
          name: t("scheduledAt"),
          type: "DateTime",
        },
        "task.completedAt": {
          id: "task.completedAt",
          name: t("completedAt"),
          type: "DateTime",
        },
        "form.name": {
          id: "form.name",
          name: t("form"),
          type: "Text",
        },
      }
    ) || {};

  const tableColumns = Object.values(columnMap);

  const selectedTableColumns = columns
    .map((id) => columnMap[id])
    .filter((column) => Boolean(column));

  const selectAll = () => {
    onStateChange({columns: tableColumns.map(({ id }) => id)})
  }

  return (
    <Column>
      <Toolbar sx={{ flexDirection: "column", alignItems: "stretch" }}>
        <Row justifyContent="space-between">
          <Row flex={1}>
            <EntitySelect
              label={t("entity")}
              formControlProps={{
                sx: { maxWidth: 200 },
                fullWidth: true,
              }}
              size="small"
              onChange={(e) => {
                const entityId = e.target.value;
                if (typeof entityId === "string") {
                  onStateChange({ entityId });
                } else {
                  onStateChange({ entityId: null });
                }
              }}
              value={entityId}
            />
            <FormSelect
              label={t("form")}
              formControlProps={{
                sx: { maxWidth: 200, ml: 1 },
                fullWidth: true,
              }}
              size="small"
              onChange={(e) => {
                const formId = e.target.value;
                if (typeof formId === "string") {
                  onStateChange({ formId });
                } else {
                  onStateChange({ formId: null });
                }
              }}
              value={formId}
            />
            <GroupSelect
              formControlProps={{
                sx: { maxWidth: 200, ml: 1 },
                fullWidth: true,
              }}
              size="small"
              onChange={(group) => {
                if (group) {
                  onStateChange({ groupId: group.id });
                } else {
                  onStateChange({ groupId: null });
                }
              }}
              value={groupId}
            />
            <ParticipantSelect
              label={t("participant")}
              formControlProps={{
                sx: { maxWidth: 200, ml: 1 },
                fullWidth: true,
              }}
              size="small"
              onChange={(e) => {
                const participantId = e.target.value;
                if (typeof participantId === "string") {
                  onStateChange({ participantId });
                } else {
                  onStateChange({ participantId: null });
                }
              }}
              value={participantId}
            />
          </Row>
          <Row>
            <Button onClick={selectAll} testId="record select all">{t('select all')}</Button>
            <IconButton
              testId="refresh table"
              Icon={<Refresh />}
              onClick={refreshCounter.increase}
              tooltipProps={{
                title: t("refresh data"),
              }}
            />
            <IconButton
              testId="export table"
              Icon={<Download />}
              onClick={() =>
                exportRecords
                  .mutateAsync({ ...state, columns: selectedTableColumns })
                  .then((data) => {
                    downloadCSV(data);
                  })
              }
              tooltipProps={{
                title: t("export data"),
              }}
            />
          </Row>
        </Row>
        <Column mb={1} flex={1}>
          <Autocomplete
            data-testid="change columns"
            multiple
            freeSolo
            id="tags-filled"
            options={tableColumns}
            value={selectedTableColumns}
            onChange={(_, columns) => {
              onStateChange({
                columns: (columns as TableColumn[]).map(({ id }) => id),
              });
            }}
            // @ts-ignore
            ListboxProps={{ "data-testid": "columns" }}
            renderTags={(options: readonly TableColumn[], getTagProps) =>
              options.map((option, index) => (
                <Chip
                  label={option.name}
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
            filterOptions={(options, { inputValue }) => {
              return options.filter(
                (option) =>
                  !columns.includes(option.id) &&
                  option.name.toLowerCase().includes(inputValue.toLowerCase())
              );
            }}
            renderInput={(params) => {
              return (
                <TextField
                  label={t("columns")}
                  {...params}
                  size="small"
                  fullWidth
                  margin="normal"
                />
              );
            }}
            getOptionLabel={(option) => {
              if (typeof option === "string") return option;
              return option.name;
            }}
          />
        </Column>
      </Toolbar>
      <Divider />
      {getRecords.isLoading && <LinearProgress />}
      <Column mt={1} ml={3} mr={3} mb={1} overflow="hidden" boxShadow={1}>
        <RecordsTable
          columns={selectedTableColumns}
          data={getRecords.data ?? []}
        />
      </Column>
    </Column>
  );
};
