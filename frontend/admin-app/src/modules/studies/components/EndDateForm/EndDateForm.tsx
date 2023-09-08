import { Column, Editable, OnlyAdmin, Text } from "@modules/core/components";
import { useSetStudyEndDate } from "@modules/studies/hooks";
import { Study } from "@modules/studies/types";
import { InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface EndDateFormProps {
  study: Study;
}

export const EndDateForm: React.FC<EndDateFormProps> = ({ study }) => {
  const setStudyEndDate = useSetStudyEndDate();
  const { t } = useTranslation();

  const formattedDate = study.endDate
    ? new Date(study.endDate).toLocaleDateString("de")
    : "-";

  return (
    <Column height={60} width={132} ml={1}>
      <InputLabel sx={{ ml: 1 }}>{t("endDate")}</InputLabel>
      <OnlyAdmin>
        {({ disabled }) => (
          <Editable
            testId="edit end date"
            inputTestId="change end date"
            type="date"
            defaultText={study.endDate ? study.endDate : ""}
            disabled={disabled}
            showClose={false}
            onSubmit={(date) => setStudyEndDate.mutate({ date })}
          >
            <Text>{formattedDate}</Text>
          </Editable>
        )}
      </OnlyAdmin>
    </Column>
  );
};
