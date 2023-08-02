import { AuthenticationGuard, LoginGuard } from "@modules/auth/components";
import ChatPage from "@pages/ChatPage/ChatPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import TasksPage from "@pages/TasksPage/TasksPage";
import { Navigate,  Outlet,  createBrowserRouter } from "react-router-dom";
import EventsPage from "@pages/Eventspage/EventsPage";
import { Cacher } from "@modules/core/components";
import { DateGuard } from "@modules/date/components";
import SettingsPage from "@pages/SettingsPage/SettingsPage";
import HiitPage from "@pages/HiitPage/HiitPage";
import CalendarPage from "@pages/CalendarPage/CalendarPage";

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
        path: "events",
        element: ( 
          <DateGuard>
            <EventsPage />
          </DateGuard>
        )
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
        path: "hiit",
        element: <HiitPage />
      },
      {
        path: "calendar",
        element: <CalendarPage />
      }
    ]
  },
]);

export default router;
