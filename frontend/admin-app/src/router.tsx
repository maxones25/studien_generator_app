import { AuthenticationGuard, LoginGuard } from "@modules/auth/components";
import { StudyContainer } from "@modules/navigation/components";
import { StudyProvider } from "@modules/studies/contexts";
import EntitiesPage from "@pages/EntitiesPage/EntitiesPage";
import EntityPage from "@pages/EntityPage/EntityPage";
import GroupPage from "@pages/GroupPage/GroupPage";
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
              <StudyProvider>
                <StudyContainer>
                  <Outlet />
                </StudyContainer>
              </StudyProvider>
            ),
            children: [
              {
                path: "groups",
                element: (
                  <>
                    <GroupsPage />
                    <Outlet />
                  </>
                ),
                children: [
                  {
                    path: ":groupId",
                    element: (
                      <GroupPage/>
                    )
                  }
                ],
              },
              {
                path: "members",
                element: <MembersPage />,
              },
              {
                path: "participants",
                element: <ParticipantsPage />,
              },
              {
                path: "entities",
                element: (
                  <>
                    <EntitiesPage />
                    <Outlet />
                  </>
                ),
                children: [
                  {
                    path: ":entityId/fields",
                    element: <EntityPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
