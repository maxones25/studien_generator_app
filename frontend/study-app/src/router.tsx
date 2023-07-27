import { AuthenticationGuard, LoginGuard } from "@modules/auth/components";
import ChatPage from "@pages/ChatPage/ChatPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import TasksPage from "@pages/TasksPage/TasksPage";
import { Navigate,  Outlet,  createBrowserRouter } from "react-router-dom";
import EventsPage from "@pages/Eventspage/EventsPage";
import { Cacher } from "@modules/core/components";

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
        element: <EventsPage />
      },
      {
        path: "chat",
        element: <ChatPage />
      }
    ]
  },
]);

export default router;
