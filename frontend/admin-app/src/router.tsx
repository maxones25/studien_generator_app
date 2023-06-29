import { AuthenticationGuard, LoginGuard } from "@modules/auth/components";
import { StudyContainer } from "@modules/navigation/components";
import EntitiesPage from "@pages/EntitiesPage/EntitiesPage";
import GroupsPage from "@pages/GroupsPage/GroupsPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import MembersPage from "@pages/MembersPage/MembersPage";
import ParticipantsPage from "@pages/ParticipantsPage/ParticipantsPage";
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
        index: true,
        element: <Navigate to="/studies" />,
      },
      {
        path: "studies",
        children: [
          {
            index: true,
            element: <StudiesPage />,
          },
          {
            path: ":studyId",
            element: (
              <StudyContainer>
                <Outlet/>
              </StudyContainer>
            ),
            children: [
              {
                path: "groups",
                element: <GroupsPage/>
              },
              {
                path: "members",
                element: <MembersPage/>
              },
              {
                path: "participants",
                element: <ParticipantsPage/>
              },
              {
                path: "entities",
                element: <EntitiesPage/>
              },
            ]
          },
        ],
      },
    ],
  },
]);

export default router;
