import { AuthenticationGuard, LoginGuard } from "@modules/auth/components";
import LoginPage from "@pages/LoginPage/LoginPage";
import SignUpPage from "@pages/SignUpPage/SignUpPage";
import StudiesPage from "@pages/StudiesPage/StudiesPage";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

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
        <Outlet />
      </AuthenticationGuard>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="/studies"/>
      },
      {
        path: "studies",
        element: <StudiesPage/>
      },
    ]
  },
]);

export default router;
