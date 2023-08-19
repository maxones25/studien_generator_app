import { OnlyAdmin, Text } from "@modules/core/components";
import { useSetStudyDuration } from "@modules/studies/hooks";
import { Study } from "@modules/studies/types";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface DurationFormProps {
  study: Study;
}

export const DurationForm: React.FC<DurationFormProps> = ({ study }) => {
  const [duration, setDuration] = useState(study.duration?.toString());
  const setStudyDuration = useSetStudyDuration();
  const { t } = useTranslation();

  return (
    <OnlyAdmin>
      {({ disabled }) => (
        <TextField
          label={t("duration")}
          type="number"
          sx={{ ml: 2, width: 160 }}
          value={duration}
          InputProps={{
            disabled,
            endAdornment: (
              <InputAdornment position="end">
                <Text>{t("days")}</Text>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setDuration(e.currentTarget.value)}
          onBlur={() => {
            if (duration) {
              setStudyDuration
                .mutateAsync({ duration: parseInt(duration) })
                .catch(() => setDuration(study.duration?.toString()));
            }
          }}
        />
      )}
    </OnlyAdmin>
  );
};
