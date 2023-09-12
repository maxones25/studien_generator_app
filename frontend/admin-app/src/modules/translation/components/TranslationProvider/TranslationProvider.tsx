import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { useEffect, useRef } from "react";
import { LinearProgress } from "@mui/material";
import { useStoredState } from "@modules/core/hooks";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "de",
    fallbackLng: "de",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export interface TranslationProviderProps {
  children: JSX.Element;
}
export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const init = useRef<boolean>(false);
  const [lang] = useStoredState<string>("lang", {
    defaultValue: "de",
    storage: localStorage,
  });
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!init.current) {
      i18n.changeLanguage(lang);
      init.current = true;
    }
  }, [init, lang]);

  if (!init.current) {
    return <LinearProgress />;
  }

  return children;
};
