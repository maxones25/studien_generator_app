import { Switch } from "@modules/core/components";
import { useSetStudyActivation } from "@modules/studies/hooks";
import { Study } from "@modules/studies/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface IsActiveFormProps {
  study: Study;
}

export const IsActiveForm: React.FC<IsActiveFormProps> = ({ study }) => {
  const [isActive, setIsActive] = useState(study.isActive);
  const setStudyActivation = useSetStudyActivation();
  const { t } = useTranslation();
  return (
    <Switch
    testId="change isActive"
      label={t("isActive")}
      value={isActive}
      onChange={(e) => {
        const isActive = e.currentTarget.checked;
        setIsActive(isActive)
        setStudyActivation.mutateAsync({ isActive })
        .catch(() => {
          setIsActive(study.isActive);
        });
      }}
    />
  );
};
