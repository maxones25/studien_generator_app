import { AuthenticationGuard, LoginGuard } from "@modules/auth/components";
import ChatPage from "@pages/ChatPage/ChatPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import TasksPage from "@pages/TasksPage/TasksPage";
import { Navigate,  Outlet,  createBrowserRouter } from "react-router-dom";
import { Cacher } from "@modules/core/components";
import SettingsPage from "@pages/SettingsPage/SettingsPage";
import CalendarPage from "@pages/CalendarPage/CalendarPage";
import AppDetailsPage from "@pages/AppDetailsPage/AppDetailsPage";

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
        <Cacher>
          <Outlet  />
        </Cacher>
      </AuthenticationGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/tasks" />,
      },
      {
        path: "tasks",
        element: <TasksPage />
      },
      {
        path: "chat",
        element: <ChatPage />
      },
      {
        path: "settings",
        element: <SettingsPage />
      },
      {
        path: "calendar",
        element: <CalendarPage />
      },
      {
        path: "details",
        element: <AppDetailsPage />
      }
    ]
  },
]);

export default router;
