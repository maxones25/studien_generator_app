import { AuthenticationGuard, LoginGuard } from "@modules/auth/components";
import HelloWorldPage from "@pages/HelloWorldPage/HelloWorldPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <LoginGuard>
        <LoginPage />
      </LoginGuard>
    ),
  },
  {
    path: "/",
    element: (
      <AuthenticationGuard>
        <HelloWorldPage />
      </AuthenticationGuard>
    ),
  },
]);

export default router;
