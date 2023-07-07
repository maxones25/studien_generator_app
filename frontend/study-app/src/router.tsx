import { AuthenticationGuard, LoginGuard } from "@modules/auth/components";
import ChatPage from "@pages/ChatPage/ChatPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import RecordsPage from "@pages/RecordsPage/RecordsPage";
import TasksPage from "@pages/TasksPage/TasksPage";
import { Navigate,  Outlet,  createBrowserRouter } from "react-router-dom";

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
        <Outlet />
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
        path: "records",
        element: <RecordsPage />
      },
      {
        path: "chat",
        element: <ChatPage />
      }
    ]
  },
]);

export default router;
