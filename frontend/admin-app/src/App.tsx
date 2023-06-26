import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AccessTokenProvider } from "@modules/auth/contexts";
import { Theme } from "@modules/core/components";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

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

const queryClient = new QueryClient();

const App = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <AccessTokenProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </AccessTokenProvider>
        </Theme>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
