import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AccessTokenProvider } from "@modules/auth/contexts";
import {
  AlertNotification,
  GlobalStyle,
  NetworkProvider,
  Theme,
} from "@modules/core/components";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { SnackBarProvider } from "@modules/core/contexts";
import { TranslationProvider } from "@modules/translation/components";

const App = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <TranslationProvider>
        <NetworkProvider>
          <Theme>
            <GlobalStyle />
            <SnackBarProvider>
              <AccessTokenProvider>
                <RouterProvider router={router} />
                <AlertNotification />
              </AccessTokenProvider>
            </SnackBarProvider>
          </Theme>
        </NetworkProvider>
      </TranslationProvider>
    </Suspense>
  );
};

export default App;
