import { Column, Editable, OnlyAdmin, Text } from "@modules/core/components";
import { useSetStudyStartDate } from "@modules/studies/hooks";
import { Study } from "@modules/studies/types";
import { InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface StartDateFormProps {
  study: Study;
}

export const StartDateForm: React.FC<StartDateFormProps> = ({ study }) => {
  const setStudyStartDate = useSetStudyStartDate();
  const { t } = useTranslation();

  const formattedDate = study.startDate
    ? new Date(study.startDate).toLocaleDateString("de")
    : "-";

  return (
    <Column height={60} width={132} ml={1}>
      <InputLabel sx={{ ml: 1 }}>{t("startDate")}</InputLabel>
      <OnlyAdmin>
        {({ disabled }) => (
          <Editable
            testId="edit start date"
            inputTestId="change start date"
            type="date"
            defaultText={study.startDate ? study.startDate : ""}
            disabled={disabled}
            showClose={false}
            onSubmit={(date) => setStudyStartDate.mutate({ date })}
          >
            <Text>{formattedDate}</Text>
          </Editable>
        )}
      </OnlyAdmin>
    </Column>
  );
};
