import {
  Button,
  Column,
  DataList,
  DataListItem,
  Row,
} from "@modules/core/components";
import { useGetFields } from "@modules/fields/hooks";
import { ListItemText } from "@mui/material";
import React from "react";

export interface FieldsTabPanelProps {}

export const FieldsTabPanel: React.FC<FieldsTabPanelProps> = () => {
  const getFields = useGetFields();

  return (
    <Column mt={1}>
      <Row>
        <Button testId="add field global button">Add Global</Button>
        <Button testId="add field group button" sx={{ ml: 1 }}>
          Add Group
        </Button>
      </Row>
      <DataList
        client={getFields}
        errorText=""
        noDataText=""
        renderItem={(field, { isLast }) => (
          <DataListItem
            key={field.id}
            item={field}
            onDelete={console.log}
            onUpdate={console.log}
            divider={!isLast}
          >
            <ListItemText>{field.name}</ListItemText>
          </DataListItem>
        )}
      />
    </Column>
  );
};
