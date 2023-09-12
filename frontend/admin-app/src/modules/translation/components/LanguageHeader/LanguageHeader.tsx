import { Row, Select } from "@modules/core/components";
import { useLanguage } from "@modules/translation/contexts";
import React from "react";
export interface LanguageHeaderProps {}

export const LanguageHeader: React.FC<LanguageHeaderProps> = () => {
  const language = useLanguage();

  return (
    <Row ml={4} mr={4} mt={2} justifyContent="center">
      <Select
        name="lang"
        value={language.value}
        onChange={e => language.set(e.target.value as string)}
        size="small"
        options={[
          {
            label: "DE",
            value: "de",
          },
          {
            label: "EN",
            value: "en",
          },
          {
            label: "IT",
            value: "it",
          },
        ]}
      />
    </Row>
  );
};
