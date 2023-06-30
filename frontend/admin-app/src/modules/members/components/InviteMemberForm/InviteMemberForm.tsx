import { Button, Form, FormSelect, Row } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { Director, MemberFormData } from "@modules/members/types";
import { Add } from "@mui/icons-material";
import { Autocomplete, FormControl, IconButton, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export interface InviteMemberFormProps extends FormProps<MemberFormData> {
  directors: Director[];
}

export const InviteMemberForm: React.FC<InviteMemberFormProps> = ({
  onSubmit,
  values,
  formProps,
  directors,
}) => {
  const form = useForm<MemberFormData>({
    values,
  });

  return (
    <Form
      {...formProps}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onSubmit={form.handleSubmit((data) => {
        onSubmit(data);
        form.reset();
      })}
    >
      <FormControl margin="normal" sx={{ flex: 1 }}>
        <Autocomplete
          disablePortal
          noOptionsText="{{ no option }}"
          onChange={(_, director) => {
            form.setValue("directorId", director?.id ?? "");
          }}
          getOptionLabel={({ firstName, lastName }) =>
            `${firstName} ${lastName}`
          }
          options={directors ?? []}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Suche Mitarbeiter..."
            />
          )}
        />
        <input
          type="hidden"
          {...form.register("directorId", { required: "required" })}
        />
      </FormControl>
      <Row>
        <FormSelect
          control={form.control}
          sx={{ ml: 1, minWidth: 150 }}
          size="small"
          name="role"
          options={[
            {
              label: "Mitarbeiter",
              value: "employee",
            },
            {
              label: "Administrator",
              value: "admin",
            },
          ]}
        />
        <FormControl margin="normal" sx={{ ml: 1 }}>
          <IconButton color="success" data-testid="invite member form submit button">
            <Add/>
          </IconButton>
          {/* <Button testId="invite member form submit button" type="submit">
            {"{{ Add }}"}
          </Button> */}
        </FormControl>
      </Row>
    </Form>
  );
};
