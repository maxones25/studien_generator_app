import { AuthenticationGuard, LoginGuard } from "@modules/auth/components";
import { StudyContainer } from "@modules/navigation/components";
import { StudyProvider } from "@modules/studies/contexts";
import ChatPage from "@pages/ChatPage/ChatPage";
import ChatsPage from "@pages/ChatsPage/ChatsPage";
import EntitiesPage from "@pages/EntitiesPage/EntitiesPage";
import EntityPage from "@pages/EntityPage/EntityPage";
import FormPage from "@pages/FormPage/FormPage";
import FormsPage from "@pages/FormsPage/FormsPage";
import GroupPage from "@pages/GroupPage/GroupPage";
import GroupsPage from "@pages/GroupsPage/GroupsPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import ParticipantPage from "@pages/ParticipantPage/ParticipantPage";
import ParticipantsPage from "@pages/ParticipantsPage/ParticipantsPage";
import RecordsPage from "@pages/RecordsPage/RecordsPage";
import SignUpPage from "@pages/SignUpPage/SignUpPage";
import StudiesPage from "@pages/StudiesPage/StudiesPage";
import StudyPage from "@pages/StudyPage/StudyPage";
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
                index: true,
                element: <StudyPage />,
              },
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
                    element: <GroupPage />,
                  },
                ],
              },
              {
                path: "participants",
                element: (
                  <>
                    <ParticipantsPage />
                    <Outlet />
                  </>
                ),
                children: [
                  {
                    path: ":participantId",
                    element: <ParticipantPage />,
                  },
                ],
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
                    path: ":entityId",
                    element: <EntityPage />,
                  },
                ],
              },
              {
                path: "forms",
                element: (
                  <>
                    <FormsPage />
                    <Outlet />
                  </>
                ),
                children: [
                  {
                    path: ":formId",
                    children: [
                      {
                        index: true,
                        element: <Navigate to="pages" />,
                      },
                      {
                        path: "pages",
                        element: <FormPage />,
                      },
                      {
                        path: "pages/:pageId",
                        element: <FormPage />,
                      },
                    ],
                  },
                ],
              },
              {
                path: "chats",
                element: (
                  <>
                    <ChatsPage />
                    <Outlet />
                  </>
                ),
                children: [
                  {
                    path: ":chatId",
                    element: <ChatPage />,
                  },
                ],
              },
              {
                path: "records",
                element: <RecordsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
