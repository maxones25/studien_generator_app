import { AuthenticationGuard, LoginGuard } from "@modules/auth/components";
import HelloWorldPage from "@pages/HelloWorldPage/HelloWorldPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import SignUpPage from "@pages/SignUpPage/SignUpPage";
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
    path: "/signUp",
    element: (
      <LoginGuard>
        <SignUpPage />
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
